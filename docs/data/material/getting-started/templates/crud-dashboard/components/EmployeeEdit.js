import * as React from 'react';
import PropTypes from 'prop-types';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate, useParams } from 'react-router';
import useNotifications from '../hooks/useNotifications/useNotifications';
import {
  getOne as getEmployee,
  updateOne as updateEmployee,
  validate as validateEmployee,
} from '../data/employees';
import EmployeeForm from './EmployeeForm';
import PageContainer from './PageContainer';

function EmployeeEditForm({ initialValues, onSubmit }) {
  const { employeeId } = useParams();
  const navigate = useNavigate();

  const notifications = useNotifications();

  const [formState, setFormState] = React.useState(() => ({
    values: initialValues,
    errors: {},
  }));
  const formValues = formState.values;
  const formErrors = formState.errors;

  const setFormValues = React.useCallback((newFormValues) => {
    setFormState((previousState) => ({
      ...previousState,
      values: newFormValues,
    }));
  }, []);

  const setFormErrors = React.useCallback((newFormErrors) => {
    setFormState((previousState) => ({
      ...previousState,
      errors: newFormErrors,
    }));
  }, []);

  const handleFormFieldChange = React.useCallback(
    (name, value) => {
      const validateField = async (values) => {
        const { issues } = validateEmployee(values);
        setFormErrors({
          ...formErrors,
          [name]: issues?.find((issue) => issue.path?.[0] === name)?.message,
        });
      };

      const newFormValues = { ...formValues, [name]: value };

      setFormValues(newFormValues);
      validateField(newFormValues);
    },
    [formValues, formErrors, setFormErrors, setFormValues],
  );

  const handleFormReset = React.useCallback(() => {
    setFormValues(initialValues);
  }, [initialValues, setFormValues]);

  const handleFormSubmit = React.useCallback(async () => {
    const { issues } = validateEmployee(formValues);
    if (issues && issues.length > 0) {
      setFormErrors(
        Object.fromEntries(issues.map((issue) => [issue.path?.[0], issue.message])),
      );
      return;
    }
    setFormErrors({});

    try {
      await onSubmit(formValues);
      notifications.show('Employee edited successfully.', {
        severity: 'success',
        autoHideDuration: 3000,
      });

      navigate('/employees');
    } catch (editError) {
      notifications.show(`Failed to edit employee. Reason: ${editError.message}`, {
        severity: 'error',
        autoHideDuration: 3000,
      });
      throw editError;
    }
  }, [formValues, navigate, notifications, onSubmit, setFormErrors]);

  return (
    <EmployeeForm
      formState={formState}
      onFieldChange={handleFormFieldChange}
      onSubmit={handleFormSubmit}
      onReset={handleFormReset}
      submitButtonLabel="Save"
      backButtonPath={`/employees/${employeeId}`}
    />
  );
}

EmployeeEditForm.propTypes = {
  initialValues: PropTypes.shape({
    age: PropTypes.number,
    isFullTime: PropTypes.bool,
    joinDate: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.oneOf(['Development', 'Finance', 'Market']),
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default function EmployeeEdit() {
  const { employeeId } = useParams();

  const [employee, setEmployee] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const loadData = React.useCallback(async () => {
    setError(null);
    setIsLoading(true);

    try {
      const showData = await getEmployee(Number(employeeId));

      setEmployee(showData);
    } catch (showDataError) {
      setError(showDataError);
    }
    setIsLoading(false);
  }, [employeeId]);

  React.useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSubmit = React.useCallback(
    async (formValues) => {
      const updatedData = await updateEmployee(Number(employeeId), formValues);
      setEmployee(updatedData);
    },
    [employeeId],
  );

  const renderEdit = React.useMemo(() => {
    if (isLoading) {
      return (
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            m: 1,
          }}
        >
          <CircularProgress />
        </Box>
      );
    }
    if (error) {
      return (
        <Box sx={{ flexGrow: 1 }}>
          <Alert severity="error">{error.message}</Alert>
        </Box>
      );
    }

    return employee ? (
      <EmployeeEditForm initialValues={employee} onSubmit={handleSubmit} />
    ) : null;
  }, [isLoading, error, employee, handleSubmit]);

  return (
    <PageContainer
      title={`Edit Employee ${employeeId}`}
      breadcrumbs={[
        { title: 'Employees', path: '/employees' },
        { title: `Employee ${employeeId}`, path: `/employees/${employeeId}` },
        { title: 'Edit' },
      ]}
    >
      <Box sx={{ display: 'flex', flex: 1 }}>{renderEdit}</Box>
    </PageContainer>
  );
}
