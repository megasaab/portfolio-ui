import { Navigate, Route, Routes } from "react-router";
import { useContext, useEffect } from 'react';
import { Link } from "react-router-dom";
import Login from "./Login";
import { Context } from "..";
import PortfolioList from "./PortfolioList";
import { Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router";
import PortfolioCard from "./PortfolioCard/PortfolioCard";
import ProjectCard from "./ProjectCard/ProjectCard";

const Main = () => {

    const { store } = useContext(Context);
    const navigate = useNavigate();


    const logout = async () => {
        store.logout();
        navigate('/login');
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth();
        }
    }, []);

    return (
        <>
            <div className="bg-success mb-5">
                <div className="d-flex justify-content-between align-items-center p-3">
                    <div className="text-white fw-bold  cursor-pointer fs-3">
                        <Link className="text-link" to="/portfolio-list">Portfolios</Link>
                    </div>
                    <div className="d-flex fw-bold align-items-center">
                        <div className="me-3 text-white cursor-pointer">
                            {!store.isAuth ? <Link className="text-link" to="/login">Login</Link> : ''}
                        </div>
                        <div className="cursor-pointer text-white">
                            {!store.isAuth ? <Link className="text-link" to="/register">Registration</Link> : ''}
                        </div>
                        <div className="me-3">
                            {store.isAuth ? `${store.user.email}` : ''}
                        </div>


                        {store.isAuth ? <Button onClick={() => logout()}>Exit</Button> : ''}
                    </div>
                </div>
            </div>

            <div>
                <Routes>
                    <Route path="/portfolio-card/:id" element={<PortfolioCard />}>

                    </Route>
                    <Route path="/project-card/:id/:portfolioId" element={<ProjectCard />}>

                    </Route>
                    <Route path="" element={<Navigate to="/portfolio-list" />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/portfolio-list' element={<PortfolioList />} />
                </Routes>
            </div>
        </>

    )
}

export default observer(Main);