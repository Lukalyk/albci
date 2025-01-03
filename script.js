//Payment Method Visibility
document.getElementById('payment-method').addEventListener('change', function(){
	var paymentMethod = this.value;
	if(paymentMethod === 'mobile-money'){
		document.getElementById('mobile-money-info').style.display = 'block';

		document.getElementById('card-info').style.display = 'none';
	} else if(paymentMethod === 'debit-card'){
		document.getElementById('mobile-money-info').style.display = 'none';

		document.getElementById('card-info').style.display = 'block';
	}
});

//Map Init
const churchLocation = {lat: 5.628881, lng: -0.256051};

function initMap(){
	const map = new goggle.maps.Map(document.getElementById('map'),{
		zoom: 15, center: churchLocation, map: map, title: 'Abundant Life Bible Church International'
	});
}

document.getElementById('show-location').addEventListener('click', function(){
	document.getElementById('map-container').style.display = 'block';
	initMap();
});

//Navbar Toggling Menu
document.querySelector('.hamburger').addEventListener('click', function(){
	document.querySelector('.mobile-menu').classList.toggle('show');
});

//Link Validation Feedback
const zoomInput = document.getElementById('zoom-input');
const youtubeInput = document.getElementById('youtube-input');
const zoomFeedback = document.getElementById('zoom-feedback');
const youtubeFeedback = document.getElementById('youtube-feedback');

//For Zoom
zoomInput.addEventListener('input', () =>{
	if(zoomInput.value.includes('zoom.us') || zoomInput.value.includes('zoom.com')){
		zoomFeedback.textContent = 'Valid Zoom Link!';
		zoomFeedback.classList.add('valid');
		zoomFeedback.classList.remove('invlaid');
	} else if(zoomInput.value){
		zoomFeedback.textContent = 'Invalid Zoom Link! Must contain "zoom.us" or "zoom.com".';
		zoomFeedback.classList.add('invlaid');
		zoomFeedback.classList.remove('valid');
	} else{
		zoomFeedback.textContent = 'Example: https://zoom.us/j/123456789';
		zoomFeedback.classList.remove('invlaid', 'valid');
	}
});

//Dynamic Link Updates and Verifications
document.getElementById('update-links-btn').addEventListener('click', function(){
	const zoomLink = document.getElementById('zoom-input').value;
	const youtubeLink = document.getElementById('youtube-input').value;

	let valid = true;
	let errorMessage = "";

	if(zoomLink && !zoomLink.includes('zoom.us') && !zoomLink.includes('zoom.com')){
		valid = false;
		errorMessage += 'Invalid Zoom link. Please provide a valid Zoom link.\n';
	}

	if(youtubeLink && !youtubeLink.includes('youtube.com') && !youtubeLink.includes('youtu.be')){
		valid = false;
		errorMessage += 'Invalid YouTube link. Please provide a valid YouTube link.\n';
	}

if(valid){
	const zoomBtn = document.getElementById('zoom-btn');
	const youtubeBtn = document.getElementById('youtube-btn');

	if(zoomLink){
		zoomBtn.href = zoomLink;
	}

	if(youtubeLink){
		youtubeBtn.href = youtubeLink;
	}

	alert('Links updated successfully!');
} else{
	alert(errorMessage);
}
});

//Password Protection
document.addEventListener('DOMContentLoaded', () => {
	const passwordForm = document.getElementById('password-form');
	const uploadSection = document.getElementById('upload-section');
	const passwordModal = document.getElementById('password-modal');
	const errorMessage = document.getElementById('error-message');
	const correctPassword = "Abund4n7l1f3!";

	passwordForm.addEventListener('submit', (e) => {
		e.preventDefault();
		const enteredPassword = document.getElementById('page-password').value;

		if(enteredPassword === correctPassword){
			passwordModal.style.display = 'none';
			uploadSection.style.display = 'block';
		} else{
			errorMessage.style.display = 'block'
		}
	});
});

//Media Interactivity
document.addEventListener('DOMContentLoaded', () =>{
	const gallery = document.getElementById('media-gallery');

	//Fetch media from backend
	function fetchMedia(){
		fetch('fetch_media.php').then(response => response.json()).then(data => {
			gallery.innerHTML = '';
			data.forEach(media =>{
				const mediaItem = document.createElement('div');

				mediaItem.classList.add('media-item');

				//Add image or video
				if(media.file_path.includes('images')){
					const img = document.createElement('img');
					img.src = media.file_path;
					mediaItem.appendChild(img);
				} else{
					const video = document.createElement('video');
					video.src = media.file_path;
					video.controls = true;

					mediaItem.appendChild(video);
				}

				//Add caption
				const caption = document.createElement('p');
				caption.textContent = media.caption;

				mediaItem.appendChild(caption);

				//Ad delete button
				const deleteBtn = document.createElement('button');
				deleteBtn.textContent = 'Delete';
				deleteBtn.addEventListener('click', () => deleteMedia(media.id));

				mediaItem.appendChild(deleteBtn);

				gallery.appendChild(mediaItem);
			});
		});
	}

	//Delete media
	function deleteMedia(id){
		fetch('fetch_media.php', {
			method: 'POST', body: new URLSearchParams({id})
		}).then(fetchMedia);
	}

	fetchMedia();
});