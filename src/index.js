import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";

import Shop from "./pages/Shop/Shop";
import SingleProduct from "./pages/Shop/SingleProduct";

import MainHeader from "./layouts/Main/header";
import MainFooter from "./layouts/Main/footer";

import Login from "./pages/Login/Login";
import SignUp from "./pages/Register/User";
import UserLayout from "./layouts/User/Dashboard";
import UserLanding from "./pages/User/Landing";
import UserOrders from "./pages/User/Orders";
import UserDetails from "./pages/User/Information";

import MerchantLayout from "./layouts/Merchant/Dashboard";
import MerchantLanding from "./pages/Merchant/Landing";
import MerchantProducts from "./pages/Merchant/Products";
import AccountDetails from "./pages/Merchant/Account";
import MerchantAddProducts from "./pages/Merchant/AddProducts";
import MerchantEditProducts from "./pages/Merchant/EditProducts";
import MerchantLogin from "./pages/Login/Merchant";
import MerchantSignUp from "./pages/Register/Vendor";

import AdminDashboard from "./pages/Admin/Dashboard";

import Cart from "./pages/Cart/CartPage";
import Checkout from "./pages/Checkout/Checkout";
import { CartProvider } from "./components/Cart/CartContext";

import ProtectedRoute from "./helpers/ProtectedRoute";

import "./index.css";
// import Pricing from "./layouts/layout";
// import "fontsource-roboto";
// import App from './App';

import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<Switch>
				<Route path='/admin/:path?' exact>
					<Switch>
						<Route path='/admin' exact component={AdminDashboard} />
						<Route
							path='/admin'
							render={() => <div>404 Page not found</div>}
						/>
						{/* <Route path='/admin/setting' component={Setting} /> */}
					</Switch>
				</Route>

				<ProtectedRoute path='/merchant/:path?'>
					<MerchantLayout />
					<Switch>
						<ProtectedRoute
							path='/merchant'
							exact
							component={MerchantLanding}
						/>
						<ProtectedRoute
							path='/merchant/products'
							exact
							component={MerchantProducts}
						/>
						<ProtectedRoute
							path='/merchant/addproducts'
							exact
							component={MerchantAddProducts}
						/>
						<ProtectedRoute
							path='/merchant/products/:id'
							exact
							component={MerchantEditProducts}
						/>
						<ProtectedRoute
							path='/merchant/account'
							exact
							component={AccountDetails}
						/>

						<ProtectedRoute
							path='/merchant'
							render={() => <div>404 Page not found</div>}
						/>
					</Switch>
				</ProtectedRoute>

				<ProtectedRoute path='/user/:path?' exact>
					<UserLayout />
					<Switch>
						<ProtectedRoute
							path='/user'
							exact
							component={UserLanding}
						/>
						<ProtectedRoute
							path='/user/orders'
							exact
							component={UserOrders}
						/>
						<ProtectedRoute
							path='/user/info'
							exact
							component={UserDetails}
						/>
						<ProtectedRoute
							path='/user'
							render={() => <div>404 Page not found</div>}
						/>
					</Switch>
				</ProtectedRoute>

				<Route>
					<CartProvider>
						<MainHeader />
						<Switch>
							<Route path='/' exact component={Home} />
							<Route path='/shop' exact component={Shop} />
							<Route
								path='/shop/:id'
								exact
								component={SingleProduct}
							/>
							<Route path='/about' exact component={About} />
							<Route path='/contact' exact component={Contact} />
							<Route path='/login' exact component={Login} />
							<Route path='/signup' exact component={SignUp} />
							<Route path='/cart' exact component={Cart} />
							<Route
								path='/checkout'
								exact
								component={Checkout}
							/>
							<Route
								path='/merchant-signup'
								exact
								component={MerchantSignUp}
							/>

							<Route
								path='/merchant-login'
								exact
								component={MerchantLogin}
							/>

							<Route
								path='/'
								render={() => <div>404 Page not found</div>}
							/>
						</Switch>
						<MainFooter />
					</CartProvider>
				</Route>
			</Switch>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
