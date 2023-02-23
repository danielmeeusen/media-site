import date from 'date-and-time';
import queryString from 'querystring';
import crypto from 'crypto';

import { fetcher } from '@/lib/fetch';

export async function signPost(post, member, userIp) {
	const expires = Date.now() + (4 * 60 *60 * 1000);

  post.promoVideo = `https://${process.env.BUNNY_PROMO_PULL_ZONE}/${post.promoVideoId}/play_360p.mp4`;

  post.promoStream = `https://iframe.mediadelivery.net/embed/71837/${post.promoVideoId}?autoplay=false`; 

  if (member) {
		const streamToHash = process.env.BUNNY_MEDIA_AUTH_TOKEN + post.mainVideoId + expires;
    const streamToken = crypto.createHash('sha256').update(streamToHash).digest('hex');
    post.mainStream = `https://iframe.mediadelivery.net/embed/28034/${post.mainVideoId}?token=${streamToken}&expires=${expires}&autoplay=false`;
		// post.mainStream = await signUrl(streamUrl, process.env.BUNNY_MEDIA_AUTH_TOKEN, 7200, userIp, true, streamUrl, '', '');

		const downloadUrl = `https://${process.env.BUNNY_MEDIA_PULL_ZONE}/${post.mainVideoId}/original`;

		post.mainDownload = await signUrl(downloadUrl, process.env.BUNNY_MEDIA_AUTH_TOKEN, 7200, '', false, '/', '', '');
  }
  post._id = String(post._id);
  post.publishDate = date.format(new Date(post.publishDate), 'MMM DD, YYYY');
  post.shootDate = date.format(new Date(post.shootDate), 'MMM DD, YYYY');
  post.lastUpdated = date.format(new Date(post.lastUpdated), 'MMM DD, YYYY');
	
	return post;
}

export async function getBunnyInfo(libId, vidId, apiKey) {
  const url = `https://video.bunnycdn.com/library/${libId}/videos/${vidId}`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      AccessKey: apiKey
    }
  }
	const info = await fetcher(url, options);
	return info;
};

export async function encodeVideo(libId, vidId, apiKey) {
	const encode = await fetcher(`https://video.bunnycdn.com/library/${libId}/videos/${vidId}/reencode`, {
		method: 'POST',
		headers: {
			accept: 'application/json',
			AccessKey: apiKey
		}
	})
	return encode;
}

export async function addCountries(url, a, b) {
	var tempUrl = url;
	if (a != null) {
		var tempUrlOne = new URL(tempUrl);
		tempUrl += (( tempUrlOne.search == "" ) ? "?" : "&") + "token_countries=" + a;
	}
	if (b != null) {
		var tempUrlTwo = new URL(tempUrl);
		tempUrl += ((tempUrlTwo.search == "") ? "?" : "&") + "token_countries_blocked=" + b;
	}
	return tempUrl;
}

export async function signUrl(url, securityKey, expirationTime, userIp, isDirectory, pathAllowed, countriesAllowed, countriesBlocked){
	/*
		url: CDN URL w/o the trailing '/' - exp. http://test.b-cdn.net/file.png
		securityKey: Security token found in your pull zone
		expirationTime: Authentication validity (default. 86400 sec/24 hrs)
		userIp: Optional parameter if you have the User IP feature enabled
		isDirectory: Optional parameter - "true" returns a URL separated by forward slashes (exp. (domain)/bcdn_token=...)
		pathAllowed: Directory to authenticate (exp. /path/to/images)
		countriesAllowed: List of countries allowed (exp. CA, US, TH)
		countriesBlocked: List of countries blocked (exp. CA, US, TH)
	*/
	var parameterData = "", parameterDataUrl = "", signaturePath = "", hashableBase = "", token = "";
	var expires = Math.floor(new Date() / 1000) + expirationTime;
	var url = await addCountries(url, countriesAllowed, countriesBlocked);
	var parsedUrl = new URL(url);
	var parameters = (new URL(url)).searchParams;
	if (pathAllowed != "") {
		signaturePath = pathAllowed;
		parameters.set("token_path", signaturePath);
	} else {
		signaturePath = decodeURIComponent(parsedUrl.pathname);
	}
	parameters.sort();
	if (Array.from(parameters).length > 0) {
		parameters.forEach(function(value, key) {
			if (value == "") {
				return;
			}
			if (parameterData.length > 0) {
				parameterData += "&";
			}
			parameterData += key + "=" + value;
			parameterDataUrl += "&" + key + "=" + queryString.escape(value);
			
		});
	}
	hashableBase = securityKey + signaturePath + expires + ((userIp != null) ? userIp : "") + parameterData;
	token = Buffer.from(crypto.createHash("sha256").update(hashableBase).digest()).toString("base64");
	token = token.replace(/\n/g, "").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
	if (isDirectory) {
		return parsedUrl.protocol+ "//" + parsedUrl.host + "/bcdn_token=" + token + parameterDataUrl + "&expires=" + expires + parsedUrl.pathname;
	} else {
		return parsedUrl.protocol + "//" + parsedUrl.host + parsedUrl.pathname + "?token=" + token + parameterDataUrl + "&expires=" + expires;
	}
}