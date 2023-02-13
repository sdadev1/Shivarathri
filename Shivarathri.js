if (typeof (TataAva) == "undefined") {
    TataAva = { __namespace: true };
}
if (typeof (TataAva.Journey) == "undefined") {
    TataAva.Journey = { __namespace: true };
}
TataAva.Journey.Form = {
    fn_OnJDChange: function (executionContext) {

        try {
            var formContext = executionContext.getFormContext();

            if (formContext.getAttribute("tataava_bookedon").getValue() == null)
                return;
            if (formContext.getAttribute("tataava_journey").getValue() == null)
                return;

            //var diffDays = Math.round(((((((formContext.getAttribute("tataava_journey").getValue()).getTime() - (formContext.getAttribute("tataava_bookedon").getValue()).getTime()) / 1000) / 60) / 60) / 24));
            if (Math.round(((((((formContext.getAttribute("tataava_journey").getValue()).getTime() - (formContext.getAttribute("tataava_bookedon").getValue()).getTime()) / 1000) / 60) / 60) / 24)) <= 3) {
                formContext.ui.setFormNotification('Diff must be > 3 Days', 'ERROR', 'AnilError');
                formContext.getAttribute("tataava_journey").setValue(null);
            }
            else {
                formContext.ui.clearFormNotification('AnilError');
            }
        } catch (error) {
            var alertStrings = { confirmButtonLabel: "Ok", text: "This is Error: ." + error.message, title: "Error Aaaya" };
            var alertOptions = { height: 120, width: 260 };
            Xrm.Navigation.openAlertDialog(alertStrings, alertOptions);
        }
    },
    fn_OnLoad: function (executionContext) {

        try {
            var formContext = executionContext.getFormContext();
            if (formContext.ui.getFormType() == 2) {
                formContext.getControl("tataava_journeyid").setDisabled(true);
            }
        } catch (error) {
            var alertStrings = { confirmButtonLabel: "Ok", text: "This is Error: ." + error.message, title: "Error Aaaya" };
            var alertOptions = { height: 120, width: 260 };
            Xrm.Navigation.openAlertDialog(alertStrings, alertOptions);
        }

    },
    fn_OnSave: function (executionContext) {
        try {
            var formContext = executionContext.getFormContext();
            if (formContext.ui.getFormType() == 1) {


                if (formContext.getAttribute("tataava_journeyid").getValue() == null)
                    return;

                if (formContext.getAttribute("tataava_fromcity").getValue() == null)
                    return;
                if (formContext.getAttribute("tataava_tocite").getValue() == null)
                    return;

                formContext.getControl("tataava_journeyid").setDisabled(true);
                var fCity = formContext.getAttribute("tataava_fromcity").getValue();
                var toCity = formContext.getAttribute("tataava_tocite").getValue();

                formContext.getAttribute("tataava_journeyid").setValue(fCity[0].name + "/" + formContext.getAttribute("tataava_journeyid").getValue() + "/" + toCity[0].name);
            }
        } catch (error) {
            var alertStrings = { confirmButtonLabel: "Ok", text: "This is Error: ." + error.message, title: "Error Aaaya" };
            var alertOptions = { height: 120, width: 260 };
            Xrm.Navigation.openAlertDialog(alertStrings, alertOptions);
        }


    }
},
    TataAva.Journey.Ribbon = {

        fn_EnableDisableCancelButton: function (formContext) {
            try {


                var formItem = formContext.ui.formSelector.getCurrentItem();

                if (formItem.getLabel() != "Cancel Journey")
                    return;

                var todayDate = new Date();

                if (todayDate == null)
                    return;

                if (formContext.getAttribute("tataava_cancelonorbefore").getValue() == null)
                    return;

                var diff = ((formContext.getAttribute("tataava_cancelonorbefore").getValue().getTime()) - (todayDate.getTime()));

                if (Math.round(((((diff / 1000) / 60) / 60) / 24)) <= 3) {
                    true;
                }
                else {
                    false;
                }

            } catch (error) {
                var alertStrings = { confirmButtonLabel: "Ok", text: "This is Error: ." + error.message, title: "Error Aaaya" };
                var alertOptions = { height: 120, width: 260 };
                Xrm.Navigation.openAlertDialog(alertStrings, alertOptions);
            }
        },
        fn_OnClick_Cancel: function (formContext) {
            try {

                if (formContext.getControl("tataava_canceled") == null || formContext.getControl("tataava_canceled") == undefined)
                    return;
                if (formContext.getControl("statecode") == null || formContext.getControl("statecode") == undefined)
                    return;
                formContext.getAttribute("tataava_canceled").setValue(true);

            } catch (error) {
                var alertStrings = { confirmButtonLabel: "Ok", text: "This is Error: ." + error.message, title: "Error Aaaya" };
                var alertOptions = { height: 120, width: 260 };
                Xrm.Navigation.openAlertDialog(alertStrings, alertOptions);
            }
        }
    }
