import moment from 'moment';

const d = new Date('2019/06/01');
const today = moment(d).format('MMMM d, YYYY');

export default today;
