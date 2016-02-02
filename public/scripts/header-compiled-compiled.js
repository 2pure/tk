/**The head of main page**/

var Navbar = ReactBootstrap.Navbar;
var NavItem = ReactBootstrap.NavItem;
var Nav = ReactBootstrap.Nav;
var GlyphIcon = ReactBootstrap.Glyphicon;
var NavbarForm = ReactBootstrap.Form;
var Input = ReactBootstrap.Input;
const SearchGlyphIcon = React.createElement(GlyphIcon, { glyph: "search", href: "/#" });
const UserGlyphIcon = React.createElement(GlyphIcon, { glyph: "user", href: "/#" });

const navbarInstance = React.createElement(Navbar, { inverse: true }, React.createElement(Navbar.Header, null, React.createElement(Navbar.Brand, null, React.createElement("a", { href: "#" }, "Куратор")), React.createElement(Navbar.Toggle, null)), React.createElement(Navbar.Collapse, null, React.createElement(Nav, null, React.createElement(NavItem, { eventKey: 1, href: "#" }, "О проекте"), React.createElement(NavItem, { eventKey: 2, href: "#" }, "Спектакли"), React.createElement(NavItem, { eventKey: 3, href: "#" }, "Театры")), React.createElement(Nav, { pullRight: true }, React.createElement(NavItem, { eventKey: 5, href: "#" }, UserGlyphIcon)), React.createElement(Navbar.Form, { pullRight: true }, React.createElement("form", null, React.createElement(Input, { type: "text", addonAfter: SearchGlyphIcon }), ' '))));

ReactDOM.render(navbarInstance, document.getElementById("header"));

//# sourceMappingURL=header-compiled.js.map

//# sourceMappingURL=header-compiled-compiled.js.map