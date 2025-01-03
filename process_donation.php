<?php
if($_SERVER["REQUEST_METHOD"] == "POST"){
	$donationAmount = $_POST['donation_amount'];
	$paymentMethod = $_POST['payment_method'];

	if($paymentMethod === 'mobile-money'){
		$mobileProvider = $_POST['mobile_provider'];

		switch($mobileProvider){
			case 'mtn':
			processMTNPayment($donationAmount);
			break;

			case 'telecel':
			processTelecelPayment($donationAmount);
			break;

			case 'airteltigo':
			processAirtelTigoPayment($donationAmount);
			break;

			default: echo "Please select a valid Mobile Money provider";
			break;
		}

		else if($paymentMethod == 'stripe'){
			processStripePayment($donationAmount);
		}

		function processMTNPayment($amount){
			$merchantId = 'MTN_MERCHANT_ID';
			$apiKey = 'MTN_API_KEY';
		}
		
		function processTelecelPayment($amount){
			$merchantId = 'TELECEL_MERCHANT_ID';
			$apiKey = 'TELECEL_API_KEY';
		}

		function processAitelTigoPayment($amount){
			$merchantId = 'AIRTELTIGO_MERCHANT_ID';
			$apiKey = 'AIRTELTIGO_API_KEY';
		}

	elseif($paymentMethod === 'debit-card'){
		//Stripe API Keys
		require_once('vendor/autoload.php')
		\Stripe\Stripe::setApiKey('STRIPE_AUTH_KEY');

		$token = $_POST['stripeToken'];

		try{
			$charge = \Stripe\Charge::create(['amount' => $donationAmount * 100, 'currency' => 'ghs', 'description' => 'Donation to Abundant Life Bible Church International', 'source' => '$token',]);
			echo "Thank you for your generous donation of {$donationAmount} via Credit/Debit Card in support of the church project. God richly bless you."
		} catch (\Stripe\Exception\CardException $e){
			echo "Error: " . $e->getMessage();
		}
	} else{
		echo "Invalid payment method.";
	}
}

$apiUrl = "https://api.mtn.com/merchant/submit"; //refer to official documentation
$merchantId = "MTN_MERCHANT_ID";
$apiKey = "MTN_API_KEY";
$amount = $_POST['donation_amount'];
$phoneNumber = $_POST['mobile_number'];

$data = array('merchant_id' => $merchantId, 'amount' => $amount, 'phone_number' => $phoneNumber, 'currency' => 'GHS', 'callback_url' => 'https://yourwebsite.com/mobile-money/callback');

$options = array(
	'http' => array(method' => 'POST', 'header' => 'Content-type: application/json', 'content' => json_encode($data),
		),
	);

$context = stream_context_create($options);
$response = file_get_contents($apiUrl, false, $context);

if($response === FALSE){
	die('Error initiating payment.');
}

echo $response;

//Callback after payment
$paymentStatus = $_POST['payment_status'];

if($paymentStatus == "success"){
	echo "Payment successful. Thank you for your support.";
} else{
	echo "Payment failed. Please try again.";
}
?>