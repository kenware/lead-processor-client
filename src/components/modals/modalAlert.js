import swal from 'sweetalert'

export const AlertModal = (title, text, icon = 'success', button = 'Cancel') => {
  return swal({
    title,
    text,
    icon,
    button
  })
}

export const AlertModalPromise = async ({ title, text, icon = 'success', button = 'Cancel', useIcon = true }) => {
  const data = {
    title,
    text,
    button
  }
  if (!useIcon) {
    delete data.icon
  }
  const res = await swal(data).then((value) => {
    return value
  })
  return res
}
