import * as React from 'react';
import styled from '@emotion/styled';
import { Global } from '@emotion/react';

const Div = styled('div')`
  background: pink;
  width: 200px;
  height: 200px;
`
export default function LandingPage() {
  const [result, setResult ] = React.useState(<><Global styles={{ '*': { color: 'white'}}} /><Global styles={{ 'div': { border: '1px solid grey'}}} /><Div>Regular styles</Div></>);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      console.log(result);
      setResult(<><Global styles={{ 'div': { border: '1px solid grey'}}} /><Div>Regular styles</Div></>)
    }, 5000)

    return () => {
      clearTimeout(timeout);
    }
  }, [])

  return result;
}
