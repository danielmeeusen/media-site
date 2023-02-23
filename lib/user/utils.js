export const subscribeLink = (user) => {
  return  `https://wnu.com/secure/services/?api=join&pi_code=cawuae41f3p52139&reseller=a&username=${user.username}&email=${user.email}`;
}

export const searchApi = (type, user) => {
  return `https://epoch.com/services/customer_search/index.json?auth_user=${process.env.EPOCH_AUTH}&auth_pass=${process.env.EPOCH_PASS}&api_action=search&${type}=${user}`;
}

export const cancelApi = (memberId) => {
    return `https://epoch.com/services/customer_search/index.json?auth_user=${process.env.EPOCH_AUTH}&auth_pass=${process.env.EPOCH_PASS}&api_action=cancel&member_id=${memberId}&cancel_reason=wmapprvd`;
}