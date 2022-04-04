import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { observer } from "mobx-react-lite";
import { Button, Container, Form } from "react-bootstrap";
import showdown from "showdown";
import PortfolioService from "../../service/PortfolioService";
import { SocialIcon } from 'react-social-icons'
import { Link } from "react-router-dom";
import { FaPencilAlt, FaPlus } from 'react-icons/fa';
import { Context } from "../..";
import { set } from "mobx";


const PortfolioCard = () => {


    const [portfolio, setPortfolio] = useState('');
    const [isEdit, setEdit] = useState(false);
    // forms if edit start
    const [title, setTitle] = useState(portfolio.title);
    const [position, setPosition] = useState(portfolio.position);
    const [socialNetworks, setSocialNetwork] = useState(portfolio.socialNetworks);
    const [avatarUrl, setAvatarUrl] = useState(portfolio.avatarUrl);
    const [aboutMe, setAboutMe] = useState(portfolio.aboutMe);
    const [workExpirience, setWorkExpirience] = useState(portfolio.workExpirience);
    // forms if edit ends

    const sdwConverter = new showdown.Converter();

    const { store } = useContext(Context);

    const { id } = useParams();

    useEffect(() => {

        try {
            initPorfolio();

        } catch (error) {
            console.log(error);
        }

    }, []);

    const initPorfolio = async () => {
        PortfolioService.getById(id).then(response => {
            setPortfolio(response.data.result);

        }).catch(err => console.log(err));
    }

    const onAddProjectClicked = async () => {
        try {
            await PortfolioService.createProject({
                title: 'new project', position: 'add position', socialNetworks, avatarUrl, aboutMe, workExpirience
            });

            initPorfolio()
        } catch (error) {
            console.log(error)
        }
    }

    const markDownToHtml = (md) => {
        return sdwConverter.makeHtml(md);
    }

    const onEditClicked = () => {
        setEdit((prevState) => setEdit(!prevState));
            
        setTitle(portfolio.title);
        setPosition(portfolio.position);
        setSocialNetwork(portfolio.socialNetworks);
        setAvatarUrl(portfolio.avatarUrl);
        setAboutMe(portfolio.aboutMe);
        setWorkExpirience(portfolio.workExpirience);
    }

    const onSaveFormClicked = async () => {
        try {
            socialNetworks.filter(item => item);
            const newPortfolio = { title, position, socialNetworks, avatarUrl, aboutMe, workExpirience };

            const response = await PortfolioService.editPortfolio(portfolio?._id, newPortfolio);
            setPortfolio(response.data.result);
            setEdit(false);
            console.log(response);
        } catch (error) {
            console.log(error);
        }

    }

    const onAddLinkToSocialNetworks = (elem) => {
        portfolio.socialNetworks.push(elem)
        setSocialNetwork(prev => [...portfolio.socialNetworks, elem]);
    }

    return (
        <>
            {store?.user?.portfolioId === portfolio?._id ?
                <Container>
                    <div className="text-end fw-bold mb-4 cursor-pointer" onClick={() => onEditClicked()}>
                        <FaPencilAlt />
                    </div>
                </Container> : ''
            }

            <div className="text-center fw-bold mb-4">

                {isEdit ?
                    <Container>
                        <Form.Group>
                            <Form.Label>
                                Title
                            </Form.Label>
                            <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </Form.Group>

                    </Container> : <h1>{portfolio.title}</h1>
                }

                {
                    isEdit ?
                        <Container>
                            <Form.Group>
                                <Form.Label>
                                    Position
                                </Form.Label>
                                <Form.Control type="text" value={position} onChange={(e) => setPosition(e.target.value)} />
                            </Form.Group>
                        </Container>
                        : <h3 className="text-secondary">{portfolio?.position}</h3>
                }

            </div>

            <div className="text-center d-flex mb-3">
                <div className="d-flex">
                    {portfolio.socialNetworks?.map((link, index) =>
                        isEdit ?
                            <Container key={index}>
                                <Form.Group>
                                    <Form.Label>
                                        SocialIcons
                                    </Form.Label>
                                    <div className="d-flex">
                                        <Form.Control className="me-1" type="text"
                                            onChange={(e) => setSocialNetwork([e.target.value, ...socialNetworks])} />
                                        {index === portfolio.socialNetworks?.length - 1 ?
                                            <Button className="btn-success" onClick={() => onAddLinkToSocialNetworks('new link' + index)}>
                                                <FaPlus />
                                            </Button> : ''
                                        }
                                    </div>
                                </Form.Group>
                            </Container>

                            :

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
                        {isEdit ?

                            <Form.Group>
                                <Form.Label>
                                    Avatar url
                                </Form.Label>
                                <Form.Control type="text" value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} />
                            </Form.Group>
                            :
                            <p>
                                <img width="400px" height="400px" src={portfolio?.avatarUrl} alt="person" />
                            </p>

                        }

                    </div>
                    <div className="p-4 d-block d-lg-none">

                    </div>

                    {isEdit ?

                        <textarea className="col-md-8 col-sm-12" height="2" value={aboutMe} type="textarea" onChange={(e) => setAboutMe(e.target.value)} />

                        :
                        <div className="col-md-8 col-sm-12" dangerouslySetInnerHTML={{ __html: markDownToHtml(portfolio?.aboutMe) }}>
                        </div>
                    }

                </div>
            </Container>

            {isEdit
                ?
                ''

                :
                <Container className="bg-light p-5">
                    <div className="d-flex mb-3">
                        <h4>Projects</h4>
                        <Button onClick={() => onAddProjectClicked()}>
                            ADD <FaPlus />
                        </Button>
                    </div>

                    <div className="row">
                        {portfolio.projectList?.map((item) =>
                            <Link className="text-decoration-none col-lg-4 col-md-12 p-0" to={'/project-card/' + item?._id + '/' + portfolio?._id} key={item?._id}>
                                <div className="hover-div d-flex flex-column align-items-center">
                                    <img src={item?.projectLogo} className="img-responsive img-style" alt="img-project" />
                                    <h3 className="h5" style={{ color: 'black' }}>{item?.title}</h3>
                                    <p className="text-secondary">{item?.language}</p>
                                </div>
                            </Link>
                        )}
                    </div>
                </Container>
            }


            <Container className="bg-light p-5">

                <h2>Work</h2>

                {portfolio?.workExpirience?.map((exp) =>

                    isEdit ?

                        <>
                            <div key={exp?.date}>

                                <Form.Control type="text" className="mb-3"
                                    value={workExpirience[workExpirience.indexOf(exp)]?.date}
                                    onChange={(e) => setWorkExpirience([{ date: e.target.value }, ...workExpirience[workExpirience.indexOf(exp)]])} />

                                <Form.Control type="text" className="mb-3"
                                    value={workExpirience[workExpirience.indexOf(exp)]?.companyLink}
                                    onChange={(e) => setWorkExpirience([{ companyLink: e.target.value }, ...workExpirience[workExpirience.indexOf(exp)]])} />

                                <Form.Control type="text" className="mb-3"
                                    value={workExpirience[workExpirience.indexOf(exp)]?.companyName}
                                    onChange={(e) => setWorkExpirience([{ companyName: e.target.value }, ...workExpirience[workExpirience.indexOf(exp)]])} />

                                <textarea className="col-md-8 col-sm-12" height="2"
                                    value={workExpirience[workExpirience.indexOf(exp)]?.expirience} type="textarea"
                                    onChange={(e) => setWorkExpirience([{ expirience: e.target.value }, ...workExpirience[workExpirience.indexOf(exp)]])} />

                            </div>




                        </>


                        :

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


            {isEdit ? ''


                : <Container className="bg-light p-5">

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
                            <button type="submit" className="btn btn-primary">Send message</button>
                        </div>
                    </form>
                </Container>

            }

            {
                isEdit ? <Container>
                    <div className="text-end">
                        <Button onClick={() => onSaveFormClicked()}>
                            Save
                        </Button>
                    </div>
                </Container>
                    : ''
            }

        </>
    )
}

export default observer(PortfolioCard);