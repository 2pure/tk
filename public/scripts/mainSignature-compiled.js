/**
 * Created by Vetal on 01.02.2016.
 */
var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;
var Image = ReactBootstrap.Image;
var Panel = ReactBootstrap.Panel;
const gridInstance = React.createElement(
    Grid,
    null,
    React.createElement(
        Row,
        null,
        React.createElement(
            Col,
            { md: 11, xs: 11 },
            React.createElement(
                Panel,
                { bsClass: "none" },
                React.createElement(Image, { src: "example.jpg", responsive: true })
            )
        ),
        React.createElement(
            Col,
            { md: 1, xs: 1 },
            " "
        )
    )
);

ReactDOM.render(gridInstance, document.getElementById("mainSignature"));

//# sourceMappingURL=mainSignature-compiled.js.map