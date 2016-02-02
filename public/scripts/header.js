/**The head of main page**/

var Navbar = ReactBootstrap.Navbar;
var NavItem = ReactBootstrap.NavItem;
var Nav = ReactBootstrap.Nav;
var GlyphIcon = ReactBootstrap.Glyphicon;
var NavbarForm = ReactBootstrap.Form;
var Input = ReactBootstrap.Input;
const SearchGlyphIcon = <GlyphIcon glyph="search" href="/#"/>;
const UserGlyphIcon = <GlyphIcon glyph="user" href="/#"/>;
const SearchGlyphIcon = <GlyphIcon glyph="search"/>;
const UserGlyphIcon =<GlyphIcon glyph="user" />

const navbarInstance = (
    <Navbar inverse>
        <Navbar.Header>
            <Navbar.Brand>
                <a href="#">Куратор</a>
            </Navbar.Brand>
            <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
            <Nav>
                <NavItem eventKey={1} href="#">О проекте</NavItem>
                <NavItem eventKey={2} href="#">Спектакли</NavItem>
                <NavItem eventKey={3} href="#">Театры</NavItem>
            </Nav>
            <Nav pullRight>
                <NavItem eventKey={5} href="#">{UserGlyphIcon}</NavItem>
            </Nav>
            <Navbar.Form pullRight>
                <form>
                    <Input type="text" addonAfter={SearchGlyphIcon} />
                    <NavItem>       h</NavItem>
                </form>
            </Navbar.Form>

        </Navbar.Collapse>
    </Navbar>
);

ReactDOM.render(navbarInstance, document.getElementById("header"));
