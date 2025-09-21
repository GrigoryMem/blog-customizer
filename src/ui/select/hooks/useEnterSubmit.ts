import { useEffect } from 'react';
//  типизация параметров хука
type UseEnterSubmit = {
	onChange: React.Dispatch<React.SetStateAction<boolean>>; // функция изменения состояния
	placeholderRef: React.RefObject<HTMLDivElement>; //то место, куда пользователь кликает, чтобы открыть селект).
};
// Внутри хука используется useEffect для выполнения побочных эффектов.
// useEffect принимает функцию, которая выполняется после рендеринга компонента.
// Хук нужен для того, чтобы при нажатии Enter на placeholder селект открывался или закрывался.
export const useEnterSubmit = ({
	placeholderRef,
	onChange,
}: UseEnterSubmit) => {
	useEffect(() => {
		const placeholderEl = placeholderRef.current;
		if (!placeholderEl) return; // если его нет,выходим из функции
		// Обработчик нажатия Enter
		const handleEnterKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Enter') {
				// если клавиша нажата, меняем состояние на протвоположное
				onChange((isOpen: boolean) => !isOpen);
			}
		};
		// Подписываемся на событие нажатия Enter на placeholder
		placeholderEl.addEventListener('keydown', handleEnterKeyDown);

		return () => {
			placeholderEl.removeEventListener('keydown', handleEnterKeyDown);
		};
	}, []);
};
