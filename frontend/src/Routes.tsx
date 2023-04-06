import * as React from 'react';
import {Routes as ReactRouterRoutes, Route} from 'react-router-dom'
import ResultPage from "./pages/ResultPage";
import SearchFieldPage from "./pages/SearchFieldPage";


const Routes: React.FC = () => {
    return (
            <ReactRouterRoutes>
                <Route path='/*' element={<SearchFieldPage/>}/>
                <Route path='/result/:param' element={<ResultPage/>}/>
            </ReactRouterRoutes>
    );
}
export default Routes;