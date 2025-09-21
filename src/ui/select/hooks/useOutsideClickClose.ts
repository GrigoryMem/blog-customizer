import { useEffect } from 'react';

type UseOutsideClickClose = {
	isOpen: boolean; // открыт ли селект
	onChange: (newValue: boolean) => void; // функция для изменения состояния isOpen
	onClose?: () => void; // побочная функция при закрытии
	rootRef: React.RefObject<HTMLDivElement>; // ссылка на корневой элемент(селект)
};

export const useOutsideClickClose = ({
	isOpen,
	rootRef,
	onClose,
	onChange,
}: UseOutsideClickClose) => {
	useEffect(() => {
		// функция обработки клика вне селекта
		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			console.log('ИЗУЧИ!!!', target);
			// клик вне корневого элемента селекта
			// если таргет не экземпляр Node и корневой эелемент селекта его не содержит
			//  вешается на корневой эелемент селекта чтобы проверить что селекта нет в корневом элементе
			if (target instanceof Node && !rootRef.current?.contains(target)) {
				isOpen && onClose?.(); // если isOpen true - список открыт, закрываем его
				onChange?.(false); //и меняем состояние
			}
		};
		// навешиваем обработчик глобально
		window.addEventListener('mousedown', handleClick); // навешиваем слушатель на window для событя mousedown

		return () => {
			window.removeEventListener('mousedown', handleClick);
		};
	}, [onClose, onChange, isOpen]);
};
