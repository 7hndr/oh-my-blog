export const deleteComment = id => {
	console.log('deleteComment', id)
}

export const createSession = roleId => {
	const session = {}

	switch (roleId) {
		case 1: {
			session.deleteComment = deleteComment
			break
		}
		case 2: {
			session.deleteComment = deleteComment
			break
		}
	}
	return session
}

// 	logout() {
// 		Object.keys(session.logout).forEach(key => {
// 			delete session[key]
// 		})
// 	}
