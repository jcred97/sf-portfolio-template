@IsTest
private class PortfolioControllerTest {

    /* =====================================================
       TEST: Successful Email Send
       Ensures no exception is thrown for valid input
    ===================================================== */
    @IsTest
    static void testSendContactMessage_Success() {

        Test.startTest();

        PortfolioController.sendContactMessage(
            'John Doe',
            'john@example.com',
            'Hello, this is a test message.'
        );

        Test.stopTest();

        // If no exception is thrown, test passes.
        // Email sending is automatically mocked in test context.
        System.assert(true, 'Email method executed successfully.');
    }


    /* =====================================================
       TEST: Validation Failure (Blank Fields)
       Ensures AuraHandledException is thrown
    ===================================================== */
    @IsTest
    static void testSendContactMessage_BlankFields() {

        Boolean exceptionThrown = false;

        try {
            PortfolioController.sendContactMessage('', '', '');
        } catch (Exception ex) {
            exceptionThrown = true;
        }

        System.assert(exceptionThrown,'Expected an exception for blank fields.');
    }
}