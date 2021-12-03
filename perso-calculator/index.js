const getElement = (className) => document.getElementsByClassName(className)[0];

const result = getElement("result");
const reset = getElement("reset");
const plusMinus = getElement("plus-minus");
const percent = getElement("percent");
const division = getElement("division");
const product = getElement("product");
const minus = getElement("minus");
const plus = getElement("plus");
const dot = getElement("dot");
const equals = getElement("equals");

const numbers = Array(9)
  .fill(0)
  .map((_, n) => getElement(n + 1));

numbers.unshift(getElement("zero"));

let left = "";
let right = "";
let operator = null;

const setResult = (value) => {
  result.innerText = String(Number(value));
};

const onNumberClick = (num) => {
  if (!left) {
    left = num;
    setResult(left);
  } else if (!operator) {
    left += num;
    setResult(left);
  } else {
    right += num;
    setResult(right);
  }
};

const onOperatorClick = (op) => {
  if (operator) {
    computeResult();
  }

  operator = op;
};

const computeResult = () => {
  if (!left) {
    return alert("left operand is not set");
  }

  if (!operator) {
    return alert("operator is not set");
  }

  if (!left) {
    return alert("right operand is not set");
  }

  const a = Number(left);
  const b = Number(right);

  if (operator === "/" && b === 0) {
    return alert("division by zero cannot be computed");
  }

  const operationResult = {
    "+": a + b,
    "-": a - b,
    X: a * b,
    "/": a / b,
  }[operator];

  setResult(operationResult);

  left = operationResult;
  right = "";
};

const onReset = () => {
  left = "";
  right = "";
  operator = null;
  setResult(0);
};

const invertResult = () => {
  setResult(-Number(result.textContent));
};

const divideResultBy100 = () => {
  setResult(Number(result.textContent) / 100);
};

for (const number of numbers) {
  number.addEventListener("click", () => onNumberClick(number.textContent));
}

for (const operatorElement of [plus, minus, product, division]) {
  operatorElement.addEventListener("click", () =>
    onOperatorClick(operatorElement.textContent)
  );
}

equals.addEventListener("click", computeResult);
reset.addEventListener("click", onReset);
plusMinus.addEventListener("click", invertResult);
percent.addEventListener("click", divideResultBy100);

dot.addEventListener("click", () => {
  alert("not implemented");
});
