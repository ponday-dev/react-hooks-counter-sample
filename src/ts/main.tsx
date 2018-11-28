import React, { useReducer, Dispatch, createContext, useContext, Context, Provider } from 'react';
import ReactDOM from 'react-dom';
import { css } from 'emotion';

interface State {
    count: number;
}
interface Action {
    type: 'INCREMENT' | 'DECREMENT';
}
type Reducer<T, S> = (state: T, action: S) => T;

const counterReducer = (state: State, action: Action) => {
    switch(action.type) {
        case 'INCREMENT':
            return { count: state.count + 1 };
        case 'DECREMENT':
            return { count: state.count - 1 };
        default:
            return state;
    }
}

interface ButtonProperty {
    children: JSX.Element | string;
    className?: string;
    actionType: 'INCREMENT' | 'DECREMENT';
    dispatch: Dispatch<Action>;
}
const Button = ({children, className, actionType, dispatch}: ButtonProperty) => {
    return (<button onClick={() => dispatch({ type: actionType })} className={className}>{children}</button>)
}

function buttonStyle(color: string, activeColor?: string): string {
    return css`
        cursor: pointer;
        background-color: transparent;
        box-sizing: border-box;
        border-radius: 3px;
        border: 2px solid ${color};
        color: ${color};
        font-size: 14px;
        height: 28px;
        width: 70px;
        outline: none;

        &:active {
            background-color: ${activeColor || color};
        }
    `;
}

interface StyledButtonProperty {
    actionType: 'INCREMENT' | 'DECREMENT';
    dispatch: Dispatch<Action>;
}
const PlusButton = (props: StyledButtonProperty) => (<Button {...props} className={buttonStyle('#d44765', '#f49bae')}>plus</Button>);
const MinusButton = (props: StyledButtonProperty) => (<Button {...props} className={buttonStyle('#2f878b', '#7ec3c6')}>minus</Button>);

type ProviderComponent = ({ children }: { children: JSX.Element }) => JSX.Element;
function createProvider<T, S>(initialState: T, reducer: Reducer<T, S>): [ProviderComponent, Context<{state: T, dispatch: Dispatch<S>}>] {
    const Context = createContext<{state: T, dispatch: Dispatch<S>}>({ state: initialState, dispatch: action => action });
    const Provider = ({ children }: { children: JSX.Element }) => {
        const [state, dispatch] = useReducer(reducer, initialState);
        return (
            <Context.Provider value={{ state, dispatch }}>
                {children}
            </Context.Provider>
        )
    }
    return [Provider, Context];
}

const [Provider, ReducerContext] = createProvider({ count: 0 }, counterReducer);

const wrapper = css`
    display: flex;
    flex-direction: column;
    width: 400px;
    height: 200px;
    border-radius: 3px;
    padding: 10px;
    box-shadow: 0 3px 6px #d3d3d3
`;
const counter = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 400px;
    flex: 1 1 auto;
    color: #434343;
`;
const buttons = css`
    width: 400px;
    display: flex;
    justify-content: space-between;
`;
const App = () => {
    const { state, dispatch } = useContext(ReducerContext);
    return (
        <div className={wrapper}>
            <div className={counter}>{state.count}</div>
            <div className={buttons}>
                <MinusButton actionType="DECREMENT" dispatch={dispatch}/>
                <PlusButton actionType="INCREMENT" dispatch={dispatch}/>
            </div>
        </div>
    );
};

ReactDOM.render(
    <Provider>
        <App />
    </Provider>,
    document.getElementById('app')
);
