import { useContext, useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { SocialIcon } from "react-social-icons";
import PortfolioService from "../../service/PortfolioService";
import { FaPencilAlt, FaWindowClose } from 'react-icons/fa';
import { Context } from "../..";

const ProjectCard = () => {

    const [project, setProject] = useState('');

    const [isEdit, setEdit] = useState(false);

    // editProject diels start

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [projectLogo, setProjectLogo] = useState('');
    const [createdDate, setCreatedDate] = useState('');
    const [language, setLanguage] = useState('');
    const [about, setAbout] = useState('');
    const [githubLink, setGithubLink] = useState('');
    const [description, setDescription] = useState('');

    // editProject diels end

    const { id, portfolioId } = useParams();
    const navigate = useNavigate();

    const onEditClicked = () => {
        setEdit(prevState => setEdit(!prevState));

        setTitle(project.title);
        setAuthor(project.author);
        setProjectLogo(project.projectLogo);
        setCreatedDate(project.createdDate);
        setLanguage(project.language);
        setAbout(project.about);
        setGithubLink(project.githubLink);
        setDescription(project.description);
    }

    const onRemoveClicked = async () => {
        try {
            const response = await PortfolioService.deleteProject(id);
            if (response.status === 200) {
                navigate('/portfolio-card/' + store.user.portfolioId);
            };
        } catch (error) {
            console.log(error);
        }
    }

    const { store } = useContext(Context);

    useEffect(() => {

        try {
            PortfolioService.getProjectById(id).then(response => {
                setProject(response.data.result);
            }).catch(err => console.log(err));

        } catch (error) {
            console.log(error);
        }

    }, []);

    const onSaveFormClicked = async () => {
        try {
            const newProject = { title, author, projectLogo, createdDate, language, about, githubLink, description };

            const response = await PortfolioService.editProject(id, newProject);
            setProject(response.data.result);
            setEdit(false);
            console.log(response);
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <Container className="bg-light p-5">
            <div className="p-3">
                {store?.user?.portfolioId === portfolioId ?

                    <div className="d-flex justify-content-between">
                        <div className="fw-bold mb-4 m-0">
                            delete <FaWindowClose className="cursor-pointer" onClick={() => onRemoveClicked()} />
                        </div>
                        <div className="fw-bold mb-4">
                            <FaPencilAlt className="cursor-pointer" onClick={() => onEditClicked()} />
                        </div>
                    </div>
                    : ''
                }
                <div className="d-flex justify-content-between mb-smaller align-items-center mb-5">

                    {isEdit ?

                        <Form.Group>
                            <Form.Label>
                                Title
                            </Form.Label>
                            <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </Form.Group>
                        :
                        <h2 className="d-inline m-0">{project?.title}</h2>
                    }

                    {isEdit ?

                        <Form.Group>
                            <Form.Label>
                                Author
                            </Form.Label>
                            <Form.Control type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
                        </Form.Group>
                        :
                        <h2 className="d-inline m-0">{project?.author}</h2>
                    }

                </div>
                <div className="row">

                    <div className="col-md-4 col-sm-12">


                        {isEdit ?

                            <Form.Group>
                                <Form.Label>
                                    projectLogo
                                </Form.Label>
                                <Form.Control type="text" value={projectLogo} onChange={(e) => setProjectLogo(e.target.value)} />
                            </Form.Group>
                            :
                            <p className="m-0">
                                <img src={project?.projectLogo} className="img-responsive" alt="" />
                            </p>
                        }

                    </div>

                    <div className="p-4 d-block d-lg-none"></div>

                    <div className="col-md-8 col-sm-12">
                        <table className="table table-borderless table-sm mb-0">
                            <tbody>

                                {isEdit ?

                                    <Form.Group>
                                        <Form.Label>
                                            Date
                                        </Form.Label>
                                        <Form.Control type="text" value={createdDate} onChange={(e) => setCreatedDate(e.target.value)} />
                                    </Form.Group>
                                    :
                                    <tr>
                                        <th>Date</th><th>
                                        </th><td>{project?.createdDate}</td>
                                    </tr>
                                }


                                {isEdit ?

                                    <Form.Group>
                                        <Form.Label>
                                            Languages &amp; Frameworks
                                        </Form.Label>
                                        <Form.Control type="text" value={language} onChange={(e) => setLanguage(e.target.value)} />
                                    </Form.Group>
                                    :
                                    <tr>
                                        <th>Languages &amp; Frameworks</th><th>
                                        </th><td>{project?.language}</td>
                                    </tr>
                                }

                                {isEdit ?

                                    <Form.Group>
                                        <Form.Label>
                                            About
                                        </Form.Label>
                                        <Form.Control type="text" value={about} onChange={(e) => setAbout(e.target.value)} />
                                    </Form.Group>
                                    :
                                    <tr>
                                        <th>About</th><th>
                                        </th><td>{project?.about}</td>
                                    </tr>
                                }



                            </tbody>
                        </table>
                    </div>


                    <div className="col-md-12">
                        <div className="p-4"></div>
                        <hr className="m-0" />
                        <div className="p-4"></div>
                    </div>

                    <div className="col-md-12 d-flex justify-content-end">
                        <div className="m-0 btn-group">

                            {/* <a href="https://github.com/madrigals1/tank2" class="btn btn-primary d-flex align-items-center">
                                <SocialIcon url={project?.githubLink} style={{ height: 25, width: 25, }} fgColor="white" className="me-1" />
                                <div>Github</div>
                            </a> */}

                            {isEdit ?

                                <Form.Group>
                                    <Form.Label>
                                        GitRepo (link)
                                    </Form.Label>
                                    <Form.Control type="text" value={githubLink} onChange={(e) => setGithubLink(e.target.value)} />
                                </Form.Group>
                                :
                                <a href={project?.githubLink} className="btn btn-primary d-flex align-items-center">
                                    <SocialIcon url={project?.githubLink} style={{ height: 25, width: 25, }} fgColor="white" className="me-1" />
                                    <div>Git</div>
                                </a>
                            }



                        </div>

                    </div>

                    <div className="card-block">
                        {isEdit ?

                            <>
                                <h3>Description</h3>

                                <textarea className="col-sm-2 col-md-4 col-lg-12" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                            </>


                            :
                            <>
                                <h2>Description</h2>
                                <p>{project?.description}</p>
                            </>

                        }

                    </div>

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


                </div>
            </div>
        </Container >
    )
}

export default ProjectCard;