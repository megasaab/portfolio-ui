import { useContext, useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import PortfolioService from "../service/PortfolioService";
import { Context } from "..";
import { observer } from "mobx-react-lite";

const PortfolioList = () => {

    const { store } = useContext(Context);

    const [portdolioList, setPortfolios] = useState([]);

    useEffect(() => {
        PortfolioService.getAll().then(response => {
            setPortfolios(response.data);
        }).catch(err => console.log(err));
    }, []);

    return (
        <div className="d-flex flex-wrap">
            {portdolioList.map((item) =>
                <Card style={{ width: '18rem' }} key={item?._id} className="mb-3">
                    <Card.Img variant="top" src={item?.avatarUrl} />
                    <Card.Body>
                        <Card.Title>{item?.title}</Card.Title>
                        <Card.Text className="text-secondary text-small">
                            {item?.position}
                        </Card.Text>
                        <Button variant="primary">
                            <Link className="text-link" to={'/portfolio-card/' + item?._id} onClick={() => store.setPortfolio(item)} >View</Link>
                        </Button>
                    </Card.Body>
                </Card>
            )}
        </div>
    )
}

export default observer(PortfolioList);