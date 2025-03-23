export const applyDrag = (arr, dragResult) => {
  const { removedIndex, addedIndex, payload } = dragResult;
  if (removedIndex === null && addedIndex === null) return arr;

  const result = [...arr];
  let itemToAdd = payload;

  if (removedIndex !== null) {
    // eslint-disable-next-line prefer-destructuring
    itemToAdd = result.splice(removedIndex, 1)[0];
  }

  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd);
  }

  return result;
};

export const generateItems = (count, creator) => {
  const result = [];
  for (let i = 0; i < count; i += 1) {
    result.push(creator(i));
  }
  return result;
};

// eslint-disable-next-line max-len
export const columnValidation = (payload, possibleOrigins) => {
  possibleOrigins.includes(payload.data);
  console.log('Validation');
};

const cardColors = [
  '#34495E',
  '#84B0DC',
  '#49627A',
  '#41B883',
  '#7096BB',
  '#97CAFC',
  '#6CC1C0',
  '#41B883',
  '#41B883',
  '#49627A',
];

const pickColor = () => {
  const rand = Math.floor(Math.random() * 10);
  return cardColors[rand];
};

const questionInput = {
  columns: {
    All: [
      { name: 'Test1', correctColumn: 'Doing' },
      { name: 'Test2', correctColumn: 'Finished' },
      { name: 'Test3', correctColumn: 'Doing' },
    ],
    Doing: [],
    Finished: [],
  },
};

export const scene = {
  type: 'container',
  props: {
    orientation: 'horizontal',
  },
  children: generateItems(Object.keys(questionInput.columns).length, (i) => ({
    id: `column${i}`,
    type: 'container',
    name: Object.keys(questionInput.columns)[i],
    props: {
      orientation: 'vertical',
      className: 'card-container',
    },
    validation: (payload) => this.columnValidation(
      payload,
      ['Test123'],
    ),
    // eslint-disable-next-line max-len
    children: generateItems(questionInput.columns[Object.keys(questionInput.columns)[i]].length, (j) => ({
      type: 'draggable',
      id: `${i}${j}`,
      props: {
        className: 'card',
        style: { backgroundColor: pickColor() },
      },
      number: Math.floor(Math.random() * 100),
      data: questionInput.columns[Object.keys(questionInput.columns)[i]][j],
    })),
  })),
};
