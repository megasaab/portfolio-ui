import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router";
import { SocialIcon } from "react-social-icons";
import PortfolioService from "../../service/PortfolioService";

const ProjectCard = () => {

    const [project, setProject] = useState('');

    const { id } = useParams();

    useEffect(() => {

        try {
            PortfolioService.getProjectById(id).then(response => {
                setProject(response.data.result);
            }).catch(err => console.log(err));

        } catch (error) {
            console.log(error);
        }

    }, []);

    return (
        <Container>
            <div className="p-3">
                <div class="d-flex justify-content-between mb-smaller align-items-center mb-5">
                    <h2 class="d-inline m-0">{project?.title}</h2>
                    <h2 class="d-inline m-0">{project?.author}</h2>
                </div>
                <div class="row">

                    <div class="col-md-4 col-sm-12">
                        <p class="m-0">
                            <img src={project?.projectLogo} class="img-responsive" alt="" />
                        </p>
                    </div>

                    <div class="p-4 d-block d-lg-none"></div>

                    <div class="col-md-8 col-sm-12">
                        <table class="table table-borderless table-sm mb-0">
                            <tbody>

                                <tr>
                                    <th>Date</th><th>
                                    </th><td>{project?.createdDate}</td>
                                </tr>

                                <tr>
                                    <th>Languages &amp; Frameworks</th><th>
                                    </th><td>{project?.language}</td>
                                </tr>

                                <tr>
                                    <th>About</th><th>
                                    </th><td>{project?.about}</td>
                                </tr>

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

                            <a href={project?.githubLink} class="btn btn-primary d-flex align-items-center">
                                <SocialIcon url={project?.githubLink} style={{ height: 25, width: 25, }} fgColor="white" className="me-1" />
                                <div>Github</div>
                            </a>

                        </div>

                    </div>

                    <div class="card-block">
                        <h2>Description</h2>
                        <p>{project?.description}</p>
                    </div>


                </div>
            </div>
        </Container >
    )
}

export default ProjectCard;