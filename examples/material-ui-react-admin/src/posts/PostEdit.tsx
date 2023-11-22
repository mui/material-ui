import {
  BooleanInput,
  DateInput,
  Edit,
  Labeled,
  NumberField,
  ReferenceArrayInput,
  ReferenceManyCount,
  ReferenceManyField,
  SimpleList,
  TabbedForm,
  TextInput,
  required,
} from 'react-admin';
import { RichTextInput } from 'ra-input-rich-text';
import { Stack } from '@mui/material';

function PostEdit() {
  return (
    <Edit>
      <TabbedForm syncWithLocation={false}>
        <TabbedForm.Tab label="Content">
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
        </TabbedForm.Tab>
        <TabbedForm.Tab label="Stats">
          <Labeled>
            <NumberField source="views" />
          </Labeled>
          <Labeled>
            <NumberField source="average_note" />
          </Labeled>
        </TabbedForm.Tab>
        <TabbedForm.Tab
          label="Comments"
          count={
            <ReferenceManyCount
              reference="comments"
              target="post_id"
              sx={{ lineHeight: 'inherit' }}
            />
          }
        >
          <ReferenceManyField
            reference="comments"
            target="post_id"
            sort={{ field: 'created_at', order: 'DESC' }}
          >
            <SimpleList
              primaryText="%{author}"
              secondaryText="%{body}"
              tertiaryText={(record) => new Date(record.created_at).toLocaleDateString()}
            />
          </ReferenceManyField>
        </TabbedForm.Tab>
      </TabbedForm>
    </Edit>
  );
}

export default PostEdit;
