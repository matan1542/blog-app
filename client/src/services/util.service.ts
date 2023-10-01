function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export function stringAvatar(name: string) {
  return {
    sx: {
      fontSize: "1rem",
      width: 30,
      height: 30,
      bgcolor: stringToColor(name),
    },
    children: name.length > 1 ? `${name[0]}${name[1]}` : `${name[0]}`,
  };
}

export function formatDate(inputDate: string): string {
  const date = new Date(inputDate);
  const formattedDate = date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
  });
  return formattedDate;
}
