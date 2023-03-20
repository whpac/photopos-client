import './ActionAreaContent.scss';

type ActionAreaContentProps = {
    title: string,
    children: JSX.Element,
};

function ActionAreaContent({ title, children }: ActionAreaContentProps){
    return (
        <div className="action-area-content">
            <h2 className="action-area-content--header">{title}</h2>
            <div className="action-area-content--body">
                {children}
            </div>
        </div>
    );
}

export default ActionAreaContent;