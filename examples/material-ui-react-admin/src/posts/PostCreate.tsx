import {
  BooleanInput,
  DateInput,
  Create,
  ReferenceArrayInput,
  SimpleForm,
  TextInput,
  required,
} from 'react-admin';
import { RichTextInput } from 'ra-input-rich-text';
import { Stack } from '@mui/material';

function PostCreate() {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="title" validate={[required()]} fullWidth />
        <TextInput source="teaser" validate={[required()]} fullWidth multiline />
        <RichTextInput source="body" validate={[required()]} fullWidth />
        <Stack direction="row" spacing={4}>
          <DateInput source="published_at" />
          <BooleanInput source="commentable" />
        </Stack>
        <ReferenceArrayInput
          label="Tags"
          reference="tags"
          source="tags"
          sortBy="tags.name"
          sort={{ field: 'name.en', order: 'ASC' }}
        />
      </SimpleForm>
    </Create>
  );
}

export default PostCreate;
