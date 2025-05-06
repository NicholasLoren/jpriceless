import { router } from '@inertiajs/react';
import { Button, Modal, ModalBody, ModalHeader, Spinner } from 'flowbite-react';
import { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { MdDelete } from 'react-icons/md';

const DeleteIcon = ({ route }) => {
    const [openModal, setOpenModal] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [flash, setFlash] = useState({ success: null, error: null });

    const deleteRecord = () => {
        router.delete(route, {
            preserveScroll: true,
            onBefore: () => {
                setIsProcessing(true);
            },
            onError: () => {},
            onSuccess: ({ props }) => {
                const {
                    flash: { success, error },
                } = props;
                setFlash({ success, error });
            },
            onFinish: () => {
                setIsProcessing(false);
            },
        });
    };

    const resetDelete = () => {
        setOpenModal(false);
        setFlash({ success: null, error: null });
    };
    return (
        <>
            <MdDelete
                className="cursor-pointer self-center text-md hover:text-red-600"
                onClick={() => setOpenModal(true)}
            />
            <Modal
                show={openModal}
                size="md"
                onClose={() => setOpenModal(false)}
                popup
            >
                <ModalHeader />
                <ModalBody>
                    <div className="text-center">
                        {flash.success ? (
                            <FaCheckCircle className="mx-auto mb-4 h-14 w-14 text-green-400 dark:text-green-200" />
                        ) : (
                            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        )}
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            {flash?.success
                                ? flash.success
                                : 'Are you sure you want to delete this record?'}
                        </h3>
                        <div className="flex justify-center gap-4">
                            {flash.success ? (
                                <Button color="success" onClick={resetDelete}>
                                    Close
                                </Button>
                            ) : (
                                <>
                                    <Button
                                        color="red"
                                        onClick={deleteRecord}
                                        disabled={isProcessing}
                                    >
                                        {isProcessing && (
                                            <Spinner
                                                size="sm"
                                                aria-label="Processing form"
                                                className="me-3"
                                                light
                                            />
                                        )}
                                        {"Yes, I'm sure"}
                                    </Button>
                                    <Button
                                        color="green"
                                        disabled={isProcessing}
                                        onClick={() => setOpenModal(false)}
                                    >
                                        No, cancel
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </>
    );
};

export default DeleteIcon;
