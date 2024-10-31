sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/ValueState"

], function(Controller, JSONModel, ValueState) {
	"use strict";

	return Controller.extend("zjblessonsformattersApp.controller.View1", {
		onInit: function () {
			var oData = {
				
				"selectedCity": "city1",
				"bRegisterValue": false,
				"bCheckboxValue": false,
				"belarusCities": [
					{
						"CityId": "city1",
						"Name": this.getResourceBundle().getText("minsk")
					},
					{
						"CityId": "city2",
						"Name": this.getResourceBundle().getText("grodno")
					},
					{
						"CityId": "city3",
						"Name": this.getResourceBundle().getText("gomel")
					},
					{
						"CityId": "city4",
						"Name":this.getResourceBundle().getText("brest")
					},
					{
						"CityId": "city5",
						"Name": this.getResourceBundle().getText("mogilev")
					},
					{
						"CityId": "city6",
						"Name": this.getResourceBundle().getText("vitebsk")
					}
				]
				
			};
			var oModel = new JSONModel(oData);
			
			this.getView().setModel(oModel);
		},
		
		getResourceBundle : function () {
			return this.getOwnerComponent().getModel("i18n").getResourceBundle();
		},
		
		onPhoneChange: function(oEvent) {
		    var input = oEvent.getSource();
		    var value = input.getValue();
		    if (!value.startsWith("+375")) {
		        input.setValue("+375");
		    }
		},
		onClearForm: function () {
		    var oView = this.getView();
		    oView.getModel().setProperty("/bRegisterValue", false);
		    oView.byId("idName").setValue("");
		    oView.byId("idLastname").setValue("");
		    oView.byId("idPhoneNumber").setValue("");
		    oView.byId("idEmail").setValue("");
		    oView.byId("idPassword").setValue("");
		    oView.byId("idConfirmPassword").setValue("");
		    oView.byId("idSelectCity").setSelectedKey(null);
		    oView.byId("idCheckBox").setSelected(false);
		    
		    oView.byId("idName").setValueState(ValueState.None);
		    oView.byId("idLastname").setValueState(ValueState.None);
		    oView.byId("idPhoneNumber").setValueState(ValueState.None);
		    oView.byId("idEmail").setValueState(ValueState.None);
		    oView.byId("idPassword").setValueState(ValueState.None);;
		    oView.byId("idConfirmPassword").setValueState(ValueState.None);
		    oView.byId("idSelectCity").setValueState(ValueState.None);
		    oView.byId("idCheckBox").setValueState(ValueState.None);
		},
		
		onSaveForm: function(){
			this.getView().getModel().setProperty("/bRegisterValue", false);
			this.getView().setBusy(true);			
			var isValid = this.validateForm();
			console.log(isValid);
			if (isValid){
				console.log('valid');
				setTimeout(() => {	
					this.getView().setBusy(false);
					this.onClearForm();
					this.getView().getModel().setProperty("/bRegisterValue", true);
				}, 3000);	
			}
			else {
				this.getView().setBusy(false);			
			}
				
			
		},
		onSelectCheckbox: function(oEvent){
			var bIsCheckBoxSelected = oEvent.getParameter('selected');
			this.getView().getModel().setProperty("/bCheckboxValue", bIsCheckBoxSelected);
		},
		
		validateForm: function() {
			var oView = this.getView();
			var isValid = true;

			var oNameInput = oView.byId("idName");
			if (!oNameInput.getValue()) {
				isValid = false;
				oNameInput.setValueState(ValueState.Error);
				oNameInput.setValueStateText(this.getResourceBundle().getText("nameError"));
			} else {
				oNameInput.setValueState(ValueState.None);
			}

			var oLastnameInput = oView.byId("idLastname");
			if (!oLastnameInput.getValue()) {
				isValid = false;
				oLastnameInput.setValueState(ValueState.Error);
				oLastnameInput.setValueStateText(this.getResourceBundle().getText("lastnameError"));
			} else {
				oLastnameInput.setValueState(ValueState.None);
			}
			
			var oCityInput = oView.byId("idSelectCity");
			console.log(oCityInput.getSelectedItem());
			if (oCityInput.getSelectedItem() == null) {
				isValid = false;
				oCityInput.setValueState(ValueState.Error);
				oCityInput.setValueStateText(this.getResourceBundle().getText("lastnameError"));
			} else {
				oCityInput.setValueState(ValueState.None);
			}
			

			var oPhoneInput = oView.byId("idPhoneNumber");
			if (oPhoneInput.getValue().length < 13 || !oPhoneInput.getValue().startsWith("+375")) {
				isValid = false;
				oPhoneInput.setValueState(ValueState.Error);
				oPhoneInput.setValueStateText(this.getResourceBundle().getText("phoneError"));
			} else {
				oPhoneInput.setValueState(ValueState.None);
			}

			var oEmailInput = oView.byId("idEmail");
			if (!oEmailInput.getValue()) {
				isValid = false;
				oEmailInput.setValueState(ValueState.Error);
				oEmailInput.setValueStateText(this.getResourceBundle().getText("emailError"));
			} else {
				oEmailInput.setValueState(ValueState.None);
			}
			
			var oPasswordInput = oView.byId("idPassword");			
			var sPasswordValue = oPasswordInput.getValue();
			var isPasswordValid = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g.test(sPasswordValue);

			if (!sPasswordValue){
				isValid = false;
				oPasswordInput.setValueState(ValueState.Error);
				oPasswordInput.setValueStateText(this.getResourceBundle().getText("passwordError"));
			}
			else if (!isPasswordValid) {
				isValid = false;
				oPasswordInput.setValueState(ValueState.Error);
				oPasswordInput.setValueStateText(this.getResourceBundle().getText("passwordIncorrectError"));
			} 
			else {
				oPasswordInput.setValueState(ValueState.None);
			}
			
			var oConfirmPassword = oView.byId("idConfirmPassword");

			if (oPasswordInput.getValue() !== oConfirmPassword) {
				isValid = false;
				oConfirmPassword.setValueState(ValueState.Error);
				oConfirmPassword.setValueStateText(this.getResourceBundle().getText("confirmPasswordError"));
			} else {
				oConfirmPassword.setValueState(ValueState.None);
			}
			return isValid;



		},

	});
});