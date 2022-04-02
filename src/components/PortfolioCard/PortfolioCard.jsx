import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import { toJS } from 'mobx'
import { Container } from "react-bootstrap";
import showdown from "showdown";
import PortfolioService from "../../service/PortfolioService";


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

            <div className="text-center d-flex">
                <div className="d-flex">
                    <div className="cursor-pointer me-5">
                        <img width="30px" height="30px" src="https://play-lh.googleusercontent.com/kMofEFLjobZy_bCuaiDogzBcUT-dz3BBbOrIEjJ-hqOabjK8ieuevGe6wlTD15QzOqw" alt="linkedin" />
                    </div>
                    <div className="cursor-pointer me-5">
                        <img width="30px" height="30px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/2048px-Octicons-mark-github.svg.png" alt="githab" />
                    </div>
                    <div className="cursor-pointer me-5">
                        <img width="30px" height="30px" src="https://img.softline.com/mcf/b641ab1aacba4e2e00251f1605c5900a/205975d32898c2059b02/scale-dec-294x280.png" />
                    </div>
                    <div className="cursor-pointer">
                        <img width="30px" height="30px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Telegram_2019_Logo.svg/1200px-Telegram_2019_Logo.svg.png" />
                    </div>
                </div>
            </div>

            <Container>
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
        </>
    )
}

export default observer(PortfolioCard);