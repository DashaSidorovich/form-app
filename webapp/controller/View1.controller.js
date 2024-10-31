sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"

], function(Controller, JSONModel) {
	"use strict";

	return Controller.extend("zjblessonsformattersApp.controller.View1", {
		onInit: function () {
			var oData = {
				
				"selectedCity": "city1",
				"registerButton": false,
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
		    const input = oEvent.getSource();
		    const value = input.getValue();
		    if (!value.startsWith("+375")) {
		        input.setValue("+375");
		    }
		},
		onClearForm: function () {
		    var oView = this.getView();
		    oView.getModel().setProperty("/registerButton", false);
		    oView.byId("idName").setValue("");
		    oView.byId("idLastname").setValue("");
		    oView.byId("idPhoneNumber").setValue("");
		    oView.byId("idEmail").setValue("");
		    oView.byId("idPassword").setValue("");
		    oView.byId("idConfirmPassword").setValue("");
		    oView.byId("idSelectCity").setSelectedKey(null);
		},
		
		onSaveForm: function(){
			this.getView().getModel().setProperty("/registerButton", false);
			this.getView().setBusy(true);
			setTimeout(() => {
				this.getView().setBusy(false);			
				this.onClearForm();
				this.getView().getModel().setProperty("/registerButton", true);
			}, 3000);

		}

	});
});