export function addFriendAction(newFriend, currentUserEmail) {
    return {
        type: 'ADD_FRIEND',
        payload: {
            newFriend: newFriend,
            currentUserEmail: currentUserEmail
        }
    }
}