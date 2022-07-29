//in this module, we are replacing the placeholders in the html scipts with our elements from our API/JSON file
module.exports = (card, elements) => {
  let output = card.replaceAll("{%NAME%}", elements.teamMember);
  output = output.replaceAll("{%JOB%}", elements.job);
  output = output.replaceAll("{%DESCRIPTION%}", elements.description);
  output = output.replaceAll("{%TWITTER%}", elements.twitter);
  output = output.replaceAll("{%PFP%}", elements.pfp);
  output = output.replaceAll("{%BG_IMAGE%}", elements.bgimg);
  output = output.replaceAll("{%SLUGS%}", elements.id);
  output = output.replaceAll("{%FROM%}", elements.from);

  return output;
};
