import store from '@/store/index.js';
import { isIos } from '@/utils/global.js'
import { getInitShareUrl, setInitShareUrl } from '@/utils/auth.js'
export default function() {
	return new Promise((resolve, reject) => {
		 if (!getInitShareUrl()) {
				setInitShareUrl()
			}
		let obj = {
			url: isIos() ? encodeURIComponent(getInitShareUrl()) : encodeURIComponent(window.location.href)
		}
		store.dispatch('weChat/getWechatConfigHandler', obj).then((res) => {
			resolve(res)
		}).catch((err) => {
			reject(err)
		})
	})
}