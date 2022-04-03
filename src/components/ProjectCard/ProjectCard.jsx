import { useContext, useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useParams } from "react-router";
import { SocialIcon } from "react-social-icons";
import PortfolioService from "../../service/PortfolioService";
import { FaPencilAlt } from 'react-icons/fa';
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
                    <Container>
                        <div className="text-end fw-bold mb-4 cursor-pointer" onClick={() => onEditClicked()}>
                            <FaPencilAlt />
                        </div>
                    </Container> : ''
                }
                <div class="d-flex justify-content-between mb-smaller align-items-center mb-5">

                    {isEdit ?

                        <Form.Group>
                            <Form.Label>
                                Title
                            </Form.Label>
                            <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </Form.Group>
                        :
                        <h2 class="d-inline m-0">{project?.title}</h2>
                    }

                    {isEdit ?

                        <Form.Group>
                            <Form.Label>
                                Author
                            </Form.Label>
                            <Form.Control type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
                        </Form.Group>
                        :
                        <h2 class="d-inline m-0">{project?.author}</h2>
                    }

                </div>
                <div class="row">

                    <div class="col-md-4 col-sm-12">


                        {isEdit ?

                            <Form.Group>
                                <Form.Label>
                                    projectLogo
                                </Form.Label>
                                <Form.Control type="text" value={projectLogo} onChange={(e) => setProjectLogo(e.target.value)} />
                            </Form.Group>
                            :
                            <p class="m-0">
                                <img src={project?.projectLogo} class="img-responsive" alt="" />
                            </p>
                        }

                    </div>

                    <div class="p-4 d-block d-lg-none"></div>

                    <div class="col-md-8 col-sm-12">
                        <table class="table table-borderless table-sm mb-0">
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


                    <div class="col-md-12">
                        <div class="p-4"></div>
                        <hr class="m-0" />
                        <div class="p-4"></div>
                    </div>

                    <div class="col-md-12 d-flex justify-content-end">
                        <div class="m-0 btn-group">

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
                                <a href={project?.githubLink} class="btn btn-primary d-flex align-items-center">
                                    <SocialIcon url={project?.githubLink} style={{ height: 25, width: 25, }} fgColor="white" className="me-1" />
                                    <div>Git</div>
                                </a>
                            }



                        </div>

                    </div>

                    <div class="card-block">
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