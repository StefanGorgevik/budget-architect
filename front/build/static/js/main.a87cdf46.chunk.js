(this.webpackJsonpfront=this.webpackJsonpfront||[]).push([[0],[,,,,,,,,,,,,,,,,function(e,t,a){e.exports=a(49)},,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},,,,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),c=a(9),l=a.n(c),o=(a(21),a(22),a(7)),u=a(2),d=a(3),i=a(4),s=a(6),p=a(5),m=(a(23),a(24),a(1));var h=Object(m.b)((function(e){return{types:e.budgetCalcTypes}}))((function(e){return n.a.createElement("form",{onSubmit:e.saveProduct,className:"budget-calc-inputs"},n.a.createElement("div",{className:"bcalc-bigger-inputs"},n.a.createElement("div",null,n.a.createElement("label",{htmlFor:"name"},"Name"),n.a.createElement("input",{onChange:e.handleInputValue,type:"text",id:"name",placeholder:"product name",value:e.product.name})),n.a.createElement("div",null,n.a.createElement("label",{htmlFor:"date"},"date"),n.a.createElement("input",{onChange:e.handleInputValue,type:"date",id:"date",value:e.product.date})),n.a.createElement("div",null,n.a.createElement("label",{htmlFor:"type"},"type"),n.a.createElement("input",{onChange:e.handleInputValue,type:"text",id:"type",value:e.product.type,placeholder:"Type"}))),n.a.createElement("div",{className:"bcalc-smaller-inputs"},n.a.createElement("div",{className:"budget-calc-price-div"},n.a.createElement("label",{htmlFor:"quantity-input"},"Price"),n.a.createElement("input",{onChange:e.handleInputValue,type:"number",id:"price",placeholder:"price",value:e.product.price})),n.a.createElement("div",{className:"budget-calc-quantity-div"},n.a.createElement("label",{id:"quantity-label",htmlFor:"quantity-input"},"Quantity"),n.a.createElement("input",{onChange:e.handleInputValue,type:"number",id:"quantity",placeholder:"quantity",value:e.product.quantity}))),n.a.createElement("button",{onClick:e.saveProduct,className:"budget-calc-submit-btn"},"  ",e.editClicked?"Save":"Submit"))})),E=(a(31),a(10)),v=a(8),b={products:[{id:25,name:"cheese",type:"food",price:150,quantity:1,date:"2020-01-01",isChecked:!1},{id:1,name:"burger",type:"food",price:120,quantity:2,date:"2019-01-01",isChecked:!1},{id:3,name:"coca cola",type:"drinks",price:60,quantity:5,date:"2020-06-01",isChecked:!1}],productGroups:[{id:0,groupDate:"2019-05-01",type:"groceries",groupTotalPrice:500,isChecked:!1,products:[{id:25,name:"Burger",price:150,quantity:2},{id:255,name:"Alva",price:100,quantity:2}]},{id:22,groupDate:"2020-01-01",type:"electronics",groupTotalPrice:600,isChecked:!1,products:[{id:23,name:"Phone",price:150,quantity:2},{id:233,name:"Laptop",price:150,quantity:2}]}],addNewGroupClicked:!1,mode:"products",productToEdit:{}};var f=Object(E.b)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:b,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SAVE_PRODUCT":return Object(u.a)({},e,{products:[].concat(Object(v.a)(e.products),[t.payload])});case"EDIT_PRODUCT":return Object(u.a)({},e,{products:e.products.filter((function(e){return e.id!==t.payload.id})),productToEdit:t.payload});case"HANDLE_IS_CHECKED":return Object(u.a)({},e,{products:e.products.map((function(e,a){return e.name===t.val?Object(u.a)({},e,{isChecked:t.checked}):e}))});case"DELETE_PRODUCTS":return Object(u.a)({},e,{products:e.products.filter((function(e){return!e.isChecked}))});case"ADD_NEW_GROUP_CLICKED":return Object(u.a)({},e,{addNewGroupClicked:t.payload});case"CHANGE_MODE":return Object(u.a)({},e,{mode:t.payload});case"SAVE_GROUP":return Object(u.a)({},e,{productGroups:[].concat(Object(v.a)(e.productGroups),[t.payload])});case"DELETE_GROUP":return Object(u.a)({},e,{productGroups:e.productGroups.filter((function(e){return e.id!==t.payload.id}))});case"SORT_GROUPS":var a=t.payload;return Object(u.a)({},e,{productGroups:Object(v.a)(e.productGroups).sort((function(e,t){return e[a]>t[a]?1:t[a]>e[a]?-1:0}))});case"SORT_PRODUCTS":var r=t.payload;return Object(u.a)({},e,{products:Object(v.a)(e.products).sort((function(e,t){return e[r]>t[r]?1:t[r]>e[r]?-1:0}))});default:return e}}));function y(e){return{type:"ADD_NEW_GROUP_CLICKED",payload:e}}function g(e){return{type:"CHANGE_MODE",payload:e}}a(32),a(33);var C=function(e){return n.a.createElement("button",{onClick:e.click,className:e.name},e.content)};a(34);var P=Object(m.b)((function(e){return{mode:e.mode}}))((function(e){return n.a.createElement("div",{className:"select-mode-div"},n.a.createElement("label",{htmlFor:"select-mode"},"Select view mode"),n.a.createElement("select",{id:"select-mode",className:"select-mode",onChange:e.selectModeHandler,value:e.mode},n.a.createElement("option",{value:"products"},"Products "),n.a.createElement("option",{value:"groups"},"Product groups")))}));a(35);var k=Object(m.b)((function(e){return{mode:e.mode}}))((function(e){var t;return t="groups"===e.mode?["groupDate","type","groupTotalPrice"]:e.sorts,n.a.createElement("div",{className:"select-sort-div"},n.a.createElement("select",{id:"sort",className:"type-select",onChange:e.selectFilterHandler},n.a.createElement("option",{value:"default"},"Select sort"),t.map((function(e,t){return n.a.createElement("option",{key:"sort".concat(t),value:e},e)}))))}));var N=function(e){return n.a.createElement("div",{className:"table-tools-content"},n.a.createElement("h1",null,"Tools"),n.a.createElement("div",{className:"filter-div"},n.a.createElement(P,{selectModeHandler:e.selectModeHandler}),n.a.createElement(k,{selectFilterHandler:e.selectFilterHandler,sorts:e.sorts})),n.a.createElement(C,{click:e.deleteProductsClicked,content:"Delete selected items",name:"table-tools-btn"}),n.a.createElement(C,{click:e.addNewGroupHandler,content:"Add a new group of products",name:"table-tools-btn"}))};a(36);var G=function(e){return n.a.createElement("main",{className:"err-alert-main"},n.a.createElement("div",{className:"err-alert-div"},n.a.createElement("h1",null,"Error"),n.a.createElement("p",null,e.text," bbbb"),n.a.createElement("button",{onClick:e.click,className:"close-err-alert-button"},"Ok")))},O=function(e){Object(s.a)(a,e);var t=Object(p.a)(a);function a(e){var r;return Object(d.a)(this,a),(r=t.call(this,e)).handleInputValue=function(e){r.setState({addedType:e.target.value})},r.handleHover=function(){r.setState({hovered:!0})},r.handleHoverLeave=function(){r.setState({hovered:!1})},r.addNewGroupHandler=function(){f.dispatch(y(!r.state.addNewGroupClicked)),f.dispatch(g("groups"))},r.selectModeHandler=function(e){f.dispatch(g(e.target.value))},r.deleteProductsClicked=function(){r.setState({deleteProducts:!0})},r.deleteProducts=function(){f.dispatch({type:"DELETE_PRODUCTS"}),r.setState({deleteProducts:!1})},r.state={hovered:!1,sorts:["name","type","price","quantity","date"],addNewGroupClicked:!1,deleteProducts:!1},r}return Object(i.a)(a,[{key:"render",value:function(){return n.a.createElement(n.a.Fragment,null,this.state.deleteProducts?n.a.createElement(G,{click:this.deleteProducts,text:"You are about to delete several items. Are you sure?"}):null,n.a.createElement("div",{className:this.state.hovered?"table-tools-div table-tools-div-active":"table-tools-div",onMouseEnter:this.handleHover,onMouseLeave:this.handleHoverLeave},this.state.hovered?n.a.createElement(N,{deleteProductsClicked:this.deleteProductsClicked,totalPrice:this.props.totalPrice,selectFilterHandler:this.props.selectFilterHandler,handleInputValue:this.handleInputValue,addTypeHandler:this.addTypeHandler,addTypeClickedHandler:this.addTypeClickedHandler,addTypeClicked:this.state.addTypeClicked,sorts:this.state.sorts,addNewGroupHandler:this.addNewGroupHandler,selectModeHandler:this.selectModeHandler}):n.a.createElement("div",{className:"before-hover-div"},n.a.createElement("p",null,n.a.createElement("i",{className:"fas fa-tools"})))))}}]),a}(n.a.Component);var T=Object(m.b)((function(e){return{types:e.budgetCalcTypes}}))(O);a(37),a(38),a(39);var j=function(e){return n.a.createElement("input",{value:e.value,onChange:e.handleCheckboxChange,className:"checkbox",type:"checkbox",checked:e.checked})};var H=function(e){var t=e.products.map((function(t,a){return n.a.createElement("tr",{key:t+a,className:"product-tr"},n.a.createElement("td",{id:"checkbox-td"},n.a.createElement(j,{handleCheckboxChange:function(t){return e.handleCheckboxChange(t)},prods:e.products,i:a,checked:t.isChecked,value:t.name})),n.a.createElement("td",null,t.name),n.a.createElement("td",null,t.type),n.a.createElement("td",{className:"number-td"},t.quantity>=1?t.price*t.quantity:t.price,t.quantity>=1?n.a.createElement("span",null,"("+t.price+")"):null),n.a.createElement("td",{className:"number-td"},t.quantity),n.a.createElement("td",null,t.date),n.a.createElement("td",{id:"edit-td"},n.a.createElement(C,{click:function(){return e.productToEdit(t)},content:"Edit",name:e.editClicked?"budg-edit-btn budg-edit-btn-disabled ":"budg-edit-btn"})))}));return n.a.createElement("tbody",null,t)};a(40);var w=function(e){return n.a.createElement("div",{className:"top-table"},n.a.createElement("ul",null,n.a.createElement("li",{id:"name-li"},"Name"),n.a.createElement("li",{id:"type-li"},"Type"),n.a.createElement("li",{id:"price-li"},"Price"),n.a.createElement("li",{id:"quantity-li"},"Quantity"),n.a.createElement("li",{id:"date-li"},"Date")))};a(41);var D=function(e){return n.a.createElement("div",{className:"table-info-div"},n.a.createElement("p",{className:"price-p"},"Total price: ",n.a.createElement("span",null,e.totalPrice)),n.a.createElement("p",{className:"price-p"},"Number of products: ",n.a.createElement("span",null,e.productsLength)))};var q=function(e){return n.a.createElement("div",{className:"table-div"},n.a.createElement("h1",null,"Products"),n.a.createElement(D,{totalPrice:e.totalPrice,productsLength:e.products.length,selectModeHandler:e.selectModeHandler}),n.a.createElement(w,{properties:e.properties}),n.a.createElement("div",{className:"products-div"},n.a.createElement("table",{className:"budg-table"},n.a.createElement(H,{products:e.products,productToEdit:e.productToEdit,handleCheckboxChange:e.handleCheckboxChange,editClicked:e.editClicked}))))};a(42),a(43),a(44),a(45);var S=function(e){return n.a.createElement("main",{className:"ng-info-main"},n.a.createElement("p",null,"Number of products: ",n.a.createElement("span",null,e.productsLength)),n.a.createElement("p",null,"Total price: ",n.a.createElement("span",null,e.totalPrice)))};var I=Object(m.b)((function(e){return{mode:e.mode,addNewGroupClicked:e.addNewGroupClicked,productToEdit:e.productToEdit,editGroupClicked:e.editGroupClicked}}))((function(e){var t=e.products.map((function(t,a){return n.a.createElement("tr",{key:t.name+a,className:"ng-new-prod-tr"},n.a.createElement("td",null,t.name),n.a.createElement("td",null,0!==t.quantity?t.price*t.quantity:t.price,0!==t.quantity?n.a.createElement("span",null,"("+t.price+")"):null),n.a.createElement("td",null,t.quantity),e.addNewGroupClicked?n.a.createElement("td",{className:"x-td",onClick:function(){return e.removeProductFromGroup(t.id)}},"X"):null)}));return n.a.createElement(n.a.Fragment,null,n.a.createElement(S,{productsLength:e.products.length,totalPrice:e.totalPrice}),n.a.createElement("table",{className:"ng-table"},n.a.createElement("thead",null,n.a.createElement("tr",null,n.a.createElement("th",null,"Name"),n.a.createElement("th",null,"Price"),n.a.createElement("th",null,"Quantity"),e.addNewGroupClicked?n.a.createElement("th",null):null)),n.a.createElement("tbody",{className:"ng-table-body"},t)))}));var V=function(e){return n.a.createElement("div",{className:"selected-group"},n.a.createElement("h1",null,"Products"),n.a.createElement(I,{products:e.products,totalPrice:e.totalPrice}))};a(46);var _=function(e){var t=e.groups.map((function(t,a){return n.a.createElement("tr",{key:t+a,className:"group-tr"},n.a.createElement("td",null,t.groupDate),n.a.createElement("td",null,t.type),n.a.createElement("td",null,t.groupTotalPrice),n.a.createElement("td",{onClick:function(){return e.selectedGroupHandler(t)},className:"expand-td"},n.a.createElement("span",null,"Open"),"  ",n.a.createElement("i",{className:"fas fa-long-arrow-alt-right"})),n.a.createElement("td",{id:"edit-td"},n.a.createElement(C,{click:function(){return e.deleteGroupHandler(t)},content:"Delete",name:"budg-edit-btn budg-dlt-btn"})))}));return n.a.createElement("table",{className:"groups-table"},n.a.createElement("thead",null,n.a.createElement("tr",null,n.a.createElement("th",null,"Date"),n.a.createElement("th",null,"Type"),n.a.createElement("th",null,"Total Price"),n.a.createElement("th",null,"Products"),n.a.createElement("th",null),n.a.createElement("th",null))),n.a.createElement("tbody",null,t))},F=function(e){Object(s.a)(a,e);var t=Object(p.a)(a);function a(e){var r;return Object(d.a)(this,a),(r=t.call(this,e)).selectedGroupHandler=function(e){r.setState({selected:e.products})},r.addNewGroupHandler=function(){f.dispatch(y(!r.state.addNewGroupClicked))},r.deleteGroupHandler=function(e){f.dispatch(function(e){return{type:"DELETE_GROUP",payload:e}}(e))},r.state={selected:[],groupsToDelete:[]},r}return Object(i.a)(a,[{key:"render",value:function(){for(var e=this.state.selected,t=0,a=0;a<e.length;a++)e[a].quantity>1?t+=e[a].quantity*Number(e[a].price):e[a].quantity<2&&(t+=Number(e[a].price));return n.a.createElement("main",{className:"groups-main"},n.a.createElement("h1",null,"Groups"),n.a.createElement("div",{className:"groups-content"},n.a.createElement("div",{className:"groups-div"},n.a.createElement(_,{groups:this.props.groups,selectedGroupHandler:this.selectedGroupHandler,deleteGroupHandler:this.deleteGroupHandler,editGroupHandler:this.editGroupHandler,totalPrice:t})),n.a.createElement("div",{className:"groups-right-div"},n.a.createElement(C,{click:this.addNewGroupHandler,content:"Add a new group of products",name:"table-tools-btn"}),n.a.createElement(V,{products:this.state.selected,totalPrice:t,addNewGroupHandler:this.addNewGroupHandler}))))}}]),a}(n.a.Component);var x=Object(m.b)((function(e){return{groups:e.productGroups}}))(F);a(47),a(48);var A=Object(m.b)((function(e){return{productToEdit:e.productToEdit}}))((function(e){return n.a.createElement("form",{onSubmit:e.addProductToGroup},n.a.createElement("div",{className:"ng-date-div"},n.a.createElement("div",null,n.a.createElement("label",{htmlFor:"date"},"Date"),n.a.createElement("input",{onChange:e.handleGroupDateInputValue,type:"date",id:"date"})),n.a.createElement("div",null,n.a.createElement("label",{htmlFor:"type"},"Type"),n.a.createElement("input",{onChange:e.handleGroupDateInputValue,type:"text",id:"type",placeholder:"Enter the type of your products"}))),n.a.createElement("input",{onChange:e.handleProductInputValue,type:"text",id:"name",placeholder:"Enter product name",value:e.product.name}),n.a.createElement("div",{className:"ng-price-quantity-div"},n.a.createElement("label",{htmlFor:"price"},"Price:"),n.a.createElement("input",{type:"number",id:"price",onChange:e.handleProductInputValue,placeholder:"Enter product price",value:e.product.price,required:!0}),n.a.createElement("label",{htmlFor:"quantity"},"Quantity:"),n.a.createElement("input",{type:"number",id:"quantity",onChange:e.handleProductInputValue,placeholder:"Enter product quantity",value:e.product.quantity})),n.a.createElement(C,{click:e.addProductToGroup,content:"Add product to group",name:"ng-btn"}))})),R=function(e){Object(s.a)(a,e);var t=Object(p.a)(a);function a(e){var r;return Object(d.a)(this,a),(r=t.call(this,e)).handleProductInputValue=function(e){r.setState(Object(u.a)({},r.state,Object(o.a)({product:Object(u.a)({},r.state.product,Object(o.a)({},e.target.id,e.target.value))},e.target.id,e.target.value)))},r.handleGroupDateInputValue=function(e){r.setState(Object(o.a)({},e.target.id,e.target.value))},r.addProductToGroup=function(e){e.preventDefault();var t=r.state.product;if(""!==t.name&&0!==t.price&&t.quantity>0){var a=r.state.newGroupProducts;t.id=Math.floor(1e3*Math.random()),a.push(t),r.setState({newGroupProducts:a,product:{name:"",price:0,quantity:1}})}else r.setState({error:!0})},r.closeErrorAlert=function(){r.setState({error:!1})},r.removeProductFromGroup=function(e){var t=r.state.newGroupProducts,a=t.filter((function(t,a){return t.id===e}));t.splice(t.indexOf(a[0]),1),r.setState({newGroupProducts:t})},r.getTotalPrice=function(e){for(var t=0,a=0;a<e.length;a++)e[a].quantity>1?t+=e[a].quantity*Number(e[a].price):t+=Number(e[a].price);return t},r.saveGroupOfProducts=function(){if(""!==r.state.type&&""!==r.state.date){var e=r.state.newGroupProducts,t=r.getTotalPrice(e),a={id:Math.floor(1e3*Math.random()),groupDate:r.state.date,type:r.state.type,groupTotalPrice:t,products:r.state.newGroupProducts};r.setState({newGroupProducts:[],type:"",date:""}),f.dispatch(y(!1)),f.dispatch({type:"SAVE_GROUP",payload:a})}else r.setState({error:!0})},r.closeNewGroup=function(){f.dispatch(y(!1))},r.state={date:"",type:"",newGroupProducts:[],product:{name:"",price:0,quantity:1},error:!1},r}return Object(i.a)(a,[{key:"render",value:function(){var e=this.state.newGroupProducts,t=this.getTotalPrice(e);return n.a.createElement("main",{className:"ng-main"},this.state.error?n.a.createElement(G,{click:this.closeErrorAlert,text:"Please fill up every field!"}):null,n.a.createElement("div",{className:"ng-div"},n.a.createElement("h3",null,"You are creating a new group of products"),n.a.createElement(A,{addProductToGroup:this.addProductToGroup,handleGroupDateInputValue:this.handleGroupDateInputValue,handleProductInputValue:this.handleProductInputValue,product:this.state.product}),n.a.createElement("div",{className:"ng-prods-dv"},n.a.createElement(I,{products:this.state.newGroupProducts,totalPrice:t,removeProductFromGroup:this.removeProductFromGroup}),n.a.createElement(C,{click:this.closeNewGroup,content:"Close",name:"ng-btn ng-close-btn"}),n.a.createElement(C,{click:this.saveGroupOfProducts,content:"Save group",name:"ng-btn"}))))}}]),a}(n.a.Component),M=function(e){Object(s.a)(a,e);var t=Object(p.a)(a);function a(e){var r;return Object(d.a)(this,a),(r=t.call(this,e)).handleInputValue=function(e){r.setState(Object(u.a)({},r.state,{product:Object(u.a)({},r.state.product,Object(o.a)({},e.target.id,e.target.value))}))},r.saveProduct=function(e){var t=r.state.product;e.preventDefault(),""!==t.name&&""!==t.type&&0!==t.price&&t.quantity>=1&&""!==t.date?(t.id=Math.floor(1e3*Math.random()),t.isChecked=!1,f.dispatch(function(e){return{type:"SAVE_PRODUCT",payload:e}}(t)),r.setState({product:{id:"",name:"",type:"",price:0,quantity:1,date:""},editClicked:!1})):r.setState({error:!0})},r.closeErrorAlert=function(){r.setState({error:!1})},r.handleCheckboxChange=function(e){var t=e.target.value,a=e.target.checked;f.dispatch(function(e,t){return{type:"HANDLE_IS_CHECKED",val:e,checked:t}}(t,a))},r.productToEdit=function(e){f.dispatch({type:"EDIT_PRODUCT",payload:e}),r.setState({editClicked:!0,product:e})},r.selectFilterHandler=function(e){var t=e.target.value;"products"===r.props.mode?f.dispatch(function(e){return{type:"SORT_PRODUCTS",payload:e}}(t)):f.dispatch(function(e){return{type:"SORT_GROUPS",payload:e}}(t))},r.state={product:{id:"",name:"",type:"",price:0,quantity:1,date:""},products:e.products,isChecked:!1,productsToDelete:[],editClicked:!1,selectedValue:"name",error:!1},r}return Object(i.a)(a,[{key:"render",value:function(){for(var e=0,t=0;t<this.state.products.length;t++)this.state.products[t].quantity>=1?e+=this.state.products[t].quantity*Number(this.state.products[t].price):this.state.products[t].quantity<1&&(e+=Number(this.state.products[t].price));return n.a.createElement("main",{className:"budget-calc-main"},this.props.addNewGroupClicked?n.a.createElement(R,null):null,this.state.error?n.a.createElement(G,{click:this.closeErrorAlert,text:"Please fill up every field!"}):null,n.a.createElement("h1",{className:"budget-calc-h1"},"Budget Calculator"),"products"===this.props.mode?n.a.createElement(h,{saveProduct:this.saveProduct,handleInputValue:this.handleInputValue,product:this.state.product,editClicked:this.state.editClicked,editProduct:this.editProduct,types:this.state.types}):null,n.a.createElement("div",{className:"budget-calc-content-div"},"products"===this.props.mode?n.a.createElement(q,{properties:this.state.properties,products:this.props.products,productToEdit:this.productToEdit,handleCheckboxChange:this.handleCheckboxChange,editClicked:this.state.editClicked,totalPrice:e}):n.a.createElement(x,null),n.a.createElement(T,{deleteProducts:this.deleteProducts,selectFilterHandler:this.selectFilterHandler})))}}]),a}(n.a.Component);var L=Object(m.b)((function(e){return{mode:e.mode,products:e.products,groups:e.productGroups,addNewGroupClicked:e.addNewGroupClicked}}))(M);var U=function(){return n.a.createElement("div",{className:"App"},n.a.createElement(L,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(n.a.createElement(m.a,{store:f},n.a.createElement(U,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[16,1,2]]]);
//# sourceMappingURL=main.a87cdf46.chunk.js.map