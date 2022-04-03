import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { observer } from "mobx-react-lite";
import { Container } from "react-bootstrap";
import showdown from "showdown";
import PortfolioService from "../../service/PortfolioService";
import { SocialIcon } from 'react-social-icons'
import { Link } from "react-router-dom";


const PortfolioCard = () => {


    const [portfolio, setPortfolio] = useState('');

    const sdwConverter = new showdown.Converter();

    const { id } = useParams();

    useEffect(() => {

        try {
            PortfolioService.getById(id).then(response => {
                setPortfolio(response.data.result);
            }).catch(err => console.log(err));

        } catch (error) {
            console.log(error);
        }

    }, []);

    const markDownToHtml = (md) => {
        return sdwConverter.makeHtml(md);
    }

    return (
        <>
            <div className="text-center fw-bold mb-4">
                <h1>{portfolio.title}</h1>
                <h3 className="text-secondary">{portfolio?.position}</h3>
            </div>

            <div className="text-center d-flex mb-3">
                <div className="d-flex">
                    {portfolio.socialNetworks?.map((link) =>
                        <div className="cursor-pointer me-5" key={link}>
                            <SocialIcon url={link} />
                        </div>
                    )}
                </div>
            </div>

            <Container className="bg-light p-5 mb-3">
                <h4 className="mb-3">About me</h4>
                <div className="row">

                    <div className="col-md-4 col-sm-12">
                        <p>
                            <img width="400px" height="400px" src={portfolio?.avatarUrl} alt="person" />
                        </p>
                    </div>
                    <div className="p-4 d-block d-lg-none">

                    </div>

                    <div className="col-md-8 col-sm-12" dangerouslySetInnerHTML={{ __html: markDownToHtml(portfolio?.aboutMe) }}>
                    </div>
                </div>
            </Container>

            <Container className="bg-light p-5">
                <h4 className="mb-3">Projects</h4>
                <div className="row">
                    {portfolio.projectList?.map((item) =>
                        <Link className="text-decoration-none col-lg-4 col-md-12 p-0" to={'/project-card/' + item?._id} key={item._id}>
                            <div className="hover-div d-flex flex-column align-items-center">
                                <img src={item?.projectLogo} className="img-responsive img-style" alt="img-project" />
                                <h3 className="h5" style={{ color: 'black' }}>{item?.title}</h3>
                                <p className="text-secondary">{item?.language}</p>
                            </div>
                        </Link>
                    )}
                </div>
            </Container>

            <Container className="bg-light p-5">

                <h2>Work</h2>

                {portfolio?.workExpirience?.map((exp) =>

                    <div className="mb-4" key={exp?.companyName}>
                        <small className="text-secondary">{exp?.date}</small>
                        <h3 className="h5 mb-2">
                            {exp?.position} - <a href={exp?.companyLink} style={{ color: 'black' }}>{exp?.companyName}</a>
                        </h3>
                        <div dangerouslySetInnerHTML={{ __html: markDownToHtml(exp?.expirience) }}>

                        </div>
                    </div>
                )}

            </Container>


            <Container className="bg-light p-5">

                <h2>Contact</h2>
                <form className="reveal-content">
                    <div className="form-group mb-3">
                        <input type="email" className="form-control" id="email" placeholder="Email" name="sender_email" />
                    </div>
                    <div className="form-group mb-3">
                        <input type="text" className="form-control" id="subject" placeholder="Subject" name="subject" />
                    </div>
                    <div className="form-group mb-3">
                        <textarea className="form-control" rows="5" placeholder="Enter your message" name="content"></textarea>
                    </div>
                    <div className="form-group mb-3">
                        <button type="submit"  className="btn btn-primary">Send message</button>
                    </div>
                </form>
            </Container>
        </>
    )
}

export default observer(PortfolioCard);