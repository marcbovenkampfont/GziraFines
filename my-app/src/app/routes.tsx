import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import { APP_ROUTES } from "../shared/constants/appRoutes";
import Resume from "../pages/resume/resume";
import AddInfractionForm from "../pages/add-fine/add-fine";


export const AppRoutes = () => {
    return (
        <Routes>
            <Route key="default" path="/" element={<Navigate to={APP_ROUTES.home} replace />} />
            <Route key="home" path={APP_ROUTES.home} element={<Home />} />
            <Route>
                <Route key="resume" path={APP_ROUTES.resume} element={<Resume />} />
                <Route key="add-multa" path={APP_ROUTES.addMulta} element={<AddInfractionForm />} />
            </Route>
        </Routes>
    )
}