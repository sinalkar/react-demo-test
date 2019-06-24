import React from 'react';

import Layout from './components/Layout/Layout';
//import CustomerPortal './containers/CustomerPortal';
import CustomerPortal from './containers/CustomerPortal';

function App() {
  return (
    <div className="App">
     <Layout>
       <CustomerPortal/>
     </Layout>
    </div>
  );
}

export default App;
