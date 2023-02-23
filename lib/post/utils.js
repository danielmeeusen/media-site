// 2022-09-04 07:11 PM
export async function formatDate(str) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let arr = str.split(' ');
  let date = arr[0].split('-');
  return `${months[date[1] - 1]} ${date[2]}, ${date[0]}`;
}

export async function formatTag(e) {
  return e.split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join('_');
}

export async function formatOG(post) {
  return post?.people.map(( p, i) => {
    p = p.replaceAll('_', ' ');
    return(
      `${i==0 ? 'with' : ''} ${p}${post.people.length > 2 ? ', ' : ''}${i === post.people.length - 2 ? ' and' : ''}`
    );
  });
}
