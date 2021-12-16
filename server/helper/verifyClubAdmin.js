const verifyClubAdmin = (club, user) => {
  if (!user) throw new Error("User is not loggedIn") // TODO: verifyAuth function  to check if the user is logged in

  const allowed = user.superAdmin || club.admins.find((id) => id === user._id)
  if (!allowed) throw new Error("User is not club admin")
}

module.exports = verifyClubAdmin
