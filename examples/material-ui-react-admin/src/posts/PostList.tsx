import {
  BooleanField,
  CreateButton,
  DatagridConfigurable,
  DateField,
  ExportButton,
  List,
  NumberField,
  ReferenceArrayField,
  SearchInput,
  SelectColumnsButton,
  TextField,
  TopToolbar,
} from 'react-admin';

function PostList() {
  return (
    <List
      sort={{ field: 'published_at', order: 'DESC' }}
      filters={[<SearchInput source="q" alwaysOn key="q" />]}
      actions={
        <TopToolbar>
          <SelectColumnsButton />
          <ExportButton />
          <CreateButton />
        </TopToolbar>
      }
    >
      <DatagridConfigurable rowClick="edit">
        <TextField source="title" />
        <NumberField source="views" />
        <NumberField source="average_note" />
        <BooleanField source="commentable" />
        <DateField source="published_at" />
        <ReferenceArrayField
          label="Tags"
          reference="tags"
          source="tags"
          sortBy="tags.name"
          sort={{ field: 'name.en', order: 'ASC' }}
        />
      </DatagridConfigurable>
    </List>
  );
}

export default PostList;
