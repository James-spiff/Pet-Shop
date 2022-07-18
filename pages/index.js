import dynamic from 'next/dynamic';
import Main from '../components/Main';

// const DynamicComponentWithNoSSR = dynamic(
//   () => import('../components/Main'),
//   { ssr: false }
// ) //renders the Main component without server side rendering in order to use the window object

export default function Home() {
  return (
    <>
      {/* <DynamicComponentWithNoSSR /> */}
      <Main />
    </>
  );
}
