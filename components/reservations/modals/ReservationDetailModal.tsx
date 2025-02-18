'use client';

import { ButtonHTMLAttributes, DetailedHTMLProps, useState } from 'react';

import { deleteAllRecurringReservation, deleteSingleReservation } from '@/apis/reservation';

import { errorToast } from '@/components/common/toast';

import useModal from '@/hooks/useModal';

import { Reservation } from '@/types/reservation';

import ModalFrame from '../../modal/ModalFrame';
import BasicButton from '../BasicButton';

export default function ReservationDetailModal({ reservation }: { reservation: Reservation }) {
  const { closeModal } = useModal();

  const dateStr = reservation.startTime.toLocaleString('ko-kr', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
  });

  const formatTime = (date: Date) => `${padZero(date.getHours())}:${padZero(date.getMinutes())}`;

  return (
    <ModalFrame onClose={closeModal}>
      <div className="relative bg-white font-noto w-[24.4rem] text-neutral-700 px-5 py-6 text-sm font-normal">
        <h2 className="font-bold mb-5 text-[1.25rem]">{reservation.userName}</h2>
        <div className="flex flex-col gap-6">
          <p>{reservation.purpose ?? ''}</p>
          <div className="flex flex-col gap-1">
            <p>예약 날짜: {dateStr}</p>
            <div className="flex gap-6">
              <p>시작 시간: {formatTime(reservation.startTime)}</p>
              <p>종료 시간: {formatTime(reservation.endTime)}</p>
            </div>
            <p>매주 반복: {reservation.recurringWeeks}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p>세미나실: {reservation.roomLocation}</p>
          </div>
          <div className="flex flex-col gap-1">
            {/* <p>예약자 계정: {reservation}</p> */}
            <p>이메일: {reservation.contactEmail}</p>
            <p>핸드폰: {reservation.contactPhone}</p>
          </div>
          <DeleteButtons reservationId={reservation.id} />
        </div>
        <span
          className="absolute top-3 right-3 material-symbols-outlined text-base cursor-pointer"
          onClick={closeModal}
        >
          close
        </span>
      </div>
    </ModalFrame>
  );
}

const DeleteButtons = ({ reservationId }: { reservationId: number }) => {
  const [submitting, setSubmitting] = useState(false);
  const { closeModal } = useModal();

  const handleDeleteAll = async () => {
    if (submitting) return;
    setSubmitting(true);
    try {
      await deleteAllRecurringReservation(reservationId);
      closeModal();
    } catch {
      errorToast('문제가 발생했습니다');
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (submitting) return;
    setSubmitting(true);
    try {
      await deleteSingleReservation(reservationId);
      closeModal();
    } catch {
      errorToast('문제가 발생했습니다');
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-end gap-2 h-[1.875rem]">
      <BasicButton className="px-[.62rem]" onClick={handleDeleteAll}>
        반복 예약 전체 삭제
      </BasicButton>
      <BasicButton className="px-[.62rem]" onClick={handleDelete}>
        해당 예약만 삭제
      </BasicButton>
    </div>
  );
};

export const ReservationDetailModalButton = ({
  reservation,
  ...props
}: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  reservation: Reservation;
}) => {
  const { openModal } = useModal();

  return (
    <button
      {...props}
      onClick={() => openModal(<ReservationDetailModal reservation={reservation} />)}
    />
  );
};

const padZero = (x: number) => (x + '').padStart(2, '0');
