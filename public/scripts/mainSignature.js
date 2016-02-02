/**
 * Created by Vetal on 01.02.2016.
 */
var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;
var Image = ReactBootstrap.Image;
var Panel = ReactBootstrap.Panel;
const gridInstance = (
    <Grid>
        <Row>
            <Col md={11} xs={11}>
                <Panel bsClass="none">
                    <Image src="example.jpg" responsive/>
                </Panel>
            </Col>
            <Col md={1} xs={1}> </Col>
        </Row>
    </Grid>
);

ReactDOM.render(gridInstance, document.getElementById("mainSignature"));