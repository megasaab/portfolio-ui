import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import { toJS } from 'mobx'
import { Container } from "react-bootstrap";
import showdown from "showdown";
import PortfolioService from "../../service/PortfolioService";
import { SocialIcon } from 'react-social-icons'


const PortfolioCard = () => {

    const { store } = useContext(Context);

    const [portfolio, setPortfolio] = useState('');

    const sdwConverter = new showdown.Converter();

    const { id } = useParams();

    useEffect(() => {
        const portfolio = toJS(store.portfolio);
        console.log(portfolio)
        if (portfolio.title) {
            setPortfolio(portfolio);
        } else {
            try {
                PortfolioService.getById(id).then(response => {
                    setPortfolio(response.data.result);
                }).catch(err => console.log(err));

            } catch (error) {
                console.log(error);
            }

        }
    }, []);

    const markDownToHtml = () => {
        const md = portfolio.aboutMe;
        return sdwConverter.makeHtml(md);
    }

    return (
        <>
            <div className="text-center fw-bold mb-4">
                <h1>{portfolio.title}</h1>
                <h3 className="text-secondary">{portfolio.position}</h3>
            </div>

            <div className="text-center d-flex mb-3">
                <div className="d-flex">
                    <div className="cursor-pointer me-5">
                        <SocialIcon url="https://www.linkedin.com/in/sabyrzhan-azhigali-585615173/" />
                    </div>
                    <div className="cursor-pointer me-5">
                        <SocialIcon url="https://github.com/megasaab/portfolio-back-end/tree/main/src/controllers" />
                    </div>
                    <div className="cursor-pointer me-5">
                        <SocialIcon url="https://gitlab.fs-labs.com/megasaab" />
                    </div>
                    <div className="cursor-pointer">
                        <SocialIcon url="https://web.telegram.org/megasaab" />
                    </div>
                </div>
            </div>

            <Container className="bg-light p-5 mb-3">
                <h4 className="mb-3">{portfolio.title}</h4>
                <div className="row">

                    <div className="col-md-4 col-sm-12">
                        <p>
                            <img src="https://static.adigame.dev/portfolio/profile.jpeg" alt="person" />
                        </p>
                    </div>
                    <div className="p-4 d-block d-lg-none">

                    </div>

                    <div className="col-md-8 col-sm-12" dangerouslySetInnerHTML={{ __html: markDownToHtml() }}>
                    </div>
                </div>
            </Container>

            <Container className="bg-light p-5">
                <h4 className="mb-3">Projects</h4>
                <div className="row">
                    <div className="col-lg-4 col-md-12 p-0">
                        <div className="hover-div d-flex flex-column align-items-center">
                            <img src="https://static.adigame.dev/portfolio/img/projects/1624373747-small.png" className="img-responsive img-style" alt="img-project" />
                            <h3 className="h5">Tank</h3>
                            <p className="text-secondary">Unity</p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-12 p-0">
                        <div className="hover-div d-flex flex-column align-items-center">
                            <img src="https://static.adigame.dev/portfolio/img/projects/1624373747-small.png" className="img-responsive img-style" alt="img-project" />
                            <h3 className="h5">Tank</h3>
                            <p className="text-secondary">Unity</p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-12 p-0">
                        <div className="hover-div d-flex flex-column align-items-center">
                            <img src="https://static.adigame.dev/portfolio/img/projects/1624373747-small.png" className="img-responsive img-style" alt="img-project" />
                            <h3 className="h5">Tank</h3>
                            <p className="text-secondary">Unity</p>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default observer(PortfolioCard);