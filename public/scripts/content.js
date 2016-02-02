/**
 * Created by Vetal on 01.02.2016.
 */

var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;
var Tab = ReactBootstrap.Tab;
var Tabs = ReactBootstrap.Tabs;
var Button = ReactBootstrap.Button;
var Navbar = ReactBootstrap.Navbar;
var NavItem = ReactBootstrap.NavItem;
var Nav = ReactBootstrap.Nav;
var Panel = ReactBootstrap.Panel;
var Carousel = ReactBootstrap.Carousel;
var CarouselItem = ReactBootstrap.CarouselItem;

//*  Общая структура: в PageContent отрисовывается Панель + EndlessScroll с параметрами карточек *//
//*  В EndlessScroll отрисовываются  <Row>Cards</Row> По параметру *//
//* Карточка коллекции - по параметрам отрисовывается *//
//TODO: вынести в отдельный скрипт и не прописывать отдельно на каждой странице.

var Card = React.createClass({
    render: function () {
        return (
            <Panel>
                <Image src="example.jpg" responsive/>
            </Panel>
        )
    }
});

var EndlessScroll = React.createClass({

    render: function () {
        return <div>
            {this.props.data};
        </div>
    }
});


var PageContent = React.createClass({
    // Изначально отрисовываем лучшии коллекции
    getInitialState: function () {
        return {
            bestActive: true,
            BestCards: [<Card id={1}/>],
            MyCards: [<Card id={2}/>, <Card id={3}/>]
        }
    },
    //Хендлер нажатия лучших коллекций
    //Если не активна, то сделаем активной
    handleBest: function () {
        if (!this.state.bestActive) {
            this.setState(function () {
                return {bestActive: true};
            })
        }
    },
    //Хендлер нажатия моих коллекций
    //-||-
    handleMy: function () {
        if (this.state.bestActive) {
            this.setState(function () {
                return {bestActive: false};
            })
        }
    },
    //Хендлер нажатия кнопки создать
    handleCreate: function () {
    },
    render: function () {
        var bestText = "Лучшие Коллекции";
        var myText = "Мои Коллекции";
        if (this.state.bestActive) {
            bestText = <u>{bestText}</u>;
        } else {
            myText = <u>{myText}</u>;
        }
        return (
            <Grid>
                <Row>
                    <Col md={12} xs={12}>
                        <Navbar id="17">
                            <Navbar.Collapse>
                                <Nav>
                                    <NavItem eventKey={1} onClick={this.handleBest}>{bestText}</NavItem>
                                    <NavItem eventKey={2} onClick={this.handleMy}>{myText}</NavItem>
                                </Nav>
                                <Navbar.Form>
                                    <Button bsStyle="success"
                                            onClick={this.handleCreate}
                                            bsSize="small">Создать Коллекцию</Button>
                                </Navbar.Form>
                            </Navbar.Collapse>
                        </Navbar>
                    </Col>
                </Row>
                <Row>
                    <Col md={6} xs={6}>
                        <EndlessScroll data={this.state.bestActive?this.state.BestCards:this.state.MyCards}/>
                    </Col>
                    <Col md={2} xs={2}>
                    </Col>
                    <Col md={4} xs={4}>
                        <Card/>
                        <Card />
                        <Card />
                    </Col>
                </Row>
            </Grid>
        )
    }
});


ReactDOM.render(
    <PageContent />
    , document.getElementById("content"));