import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
  defaultLightTheme,
  defaultDarkTheme,
} from 'react-admin';
import BookIcon from '@mui/icons-material/Book';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

import dataProvider from './dataProvider';
import PostList from './posts/PostList';
import PostEdit from './posts/PostEdit';
import PostCreate from './posts/PostCreate';

function App() {
  return (
    <Admin dataProvider={dataProvider} lightTheme={defaultLightTheme} darkTheme={defaultDarkTheme}>
      <Resource
        name="posts"
        list={PostList}
        edit={PostEdit}
        create={PostCreate}
        show={ShowGuesser}
        recordRepresentation="title"
        icon={BookIcon}
      />
      <Resource
        name="comments"
        list={ListGuesser}
        edit={EditGuesser}
        show={ShowGuesser}
        icon={ChatBubbleIcon}
      />
      <Resource name="tags" recordRepresentation={(tag) => tag.name.en} />
    </Admin>
  );
}

export default App;
