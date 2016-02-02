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
        return React.createElement(Panel, null, React.createElement(Image, { src: "example.jpg", responsive: true }));
    }
});

var EndlessScroll = React.createClass({

    render: function () {
        return React.createElement("div", null, this.props.data, ";");
    }
});

var PageContent = React.createClass({
    // Изначально отрисовываем лучшии коллекции
    getInitialState: function () {
        return {
            bestActive: true,
            BestCards: [React.createElement(Card, null)],
            MyCards: [React.createElement(Card, null), React.createElement(Card, null)]
        };
    },
    //Хендлер нажатия лучших коллекций
    //Если не активна, то сделаем активной
    handleBest: function () {
        if (!this.state.bestActive) {
            this.setState(function () {
                return { bestActive: true };
            });
        }
    },
    //Хендлер нажатия моих коллекций
    //-||-
    handleMy: function () {
        if (this.state.bestActive) {
            this.setState(function () {
                return { bestActive: false };
            });
        }
    },
    //Хендлер нажатия кнопки создать
    handleCreate: function () {},
    render: function () {
        var bestText = "Лучшие Коллекции";
        var myText = "Мои Коллекции";
        if (this.state.bestActive) {
            bestText = React.createElement("u", null, bestText);
        } else {
            myText = React.createElement("u", null, myText);
        }
        return React.createElement(Grid, null, React.createElement(Row, null, React.createElement(Col, { md: 12 }, React.createElement(Navbar, null, React.createElement(Navbar.Collapse, null, React.createElement(Nav, null, React.createElement(NavItem, { eventKey: 1, onClick: this.handleBest }, bestText), React.createElement(NavItem, { eventKey: 2, onClick: this.handleMy }, myText)), React.createElement(Navbar.Form, { pullRight: true }, React.createElement(Button, { bsStyle: "success", onClick: this.handleCreate }, "Создать Коллекцию")))))), React.createElement(Row, null, React.createElement(Col, { md: 6, xs: 6 }, React.createElement(EndlessScroll, { data: this.state.bestActive ? this.state.BestCards : this.state.MyCards })), React.createElement(Col, { md: 2, xs: 2 }), React.createElement(Col, { md: 4, xs: 4 }, React.createElement(Card, null), React.createElement(Card, null), React.createElement(Card, null))));
    }
});

/*const pageGrid = (
 <Grid>
 <Row>
 <Panel></Panel>
 </Row>
 <Row>
 <Col md={6} mdOffset={0}>123</Col>
 <Col md={3} mdOffset={0}>123</Col>
 <Col md={3} mdOffset={0}>1234</Col>
 </Row>
 </Grid>
 );*/

ReactDOM.render(React.createElement(PageContent, null), document.getElementById("content"));

//# sourceMappingURL=content-compiled.js.map

//# sourceMappingURL=content-compiled-compiled.js.map

//# sourceMappingURL=content-compiled-compiled-compiled.js.map