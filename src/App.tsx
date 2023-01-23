import { useContext } from "react";
import { observer } from "mobx-react-lite";
import { RootContext } from "./store/RootStore";

import { Layout } from "./components/Layout/Layout";
import { getContent } from "./helpers/getContentHelper";

const App = observer((): JSX.Element => {
  const { boardStore, generalStore, modalsStore } = useContext(RootContext);

  return (
    <Layout showModal={modalsStore.modal} theme={generalStore.theme}>
      {getContent(generalStore.gameState, boardStore)}
    </Layout>
  );
});

export default App;
