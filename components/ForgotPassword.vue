<template>
    <div class="modal fade" id="modal">
      <div class="modal-dialog modal-dialog-centered modal-md">
        <div class="modal-content">
          <div class="modal-header">
            <!-- <Icon name="material-symbols:keyboard-backspace-rounded" class="back btn" size="35" style="color: #a6a6a6;" /> -->
            <button
              class="btn-close color-mode-btn-close"
              type="button"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body p-l-25 p-r-25 py-4 pt-3">
            <img src="/e-free-logo.png" width="160px" alt="">
            <h5 class="fw-bold mt-2 welcome_to">{{ $t("forgot_password") }}? </h5>
            <p>{{ $t("forgot_password_text") }}</p>
            <div class="row mt-1">
              <div class="col-12 form-log">
                <form action="">
                  <label for="email" class="my-2 required">{{ $t("email") }}</label>
                  <input 
                    v-model="form.email"
                    type="text" id="email"
                    class="form-control" 
                    :placeholder="$t('email')"
                    :class="{ 'is-invalid': v$.email.$error }"
                    @change="v$.email.$touch"
                  >
                  <span class="invalid-feedback" v-if="v$.email.$error">{{ v$.email.$errors[0].$message }}</span>
                  <div class="w-100 text-center">
                    <span class="btn btn-blue mt-3 px-4" @click="save">{{ $t("send") }}</span>
                  </div>
                  
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="recaptcha-container"></div>
      
    </div>
  </template>
  <script setup>
  import {
      required,
      email,
      minLength,
      maxLength,
      url,
    } from "@vuelidate/validators";
  const state = reactive({
    modal: null,
    recaptchaVerifier: null,
  });
  let form = reactive({});
  const defaultForm = {
    email: null,
    password: null
  }
  const setDefaultForm = () => {
    Object.assign(form, defaultForm);
  }
  const emit = defineEmits(["closeModal", "goToSignIn"]);
  
  onMounted(() => {
    const bootstrap = useNuxtApp().$bootstrap;
    state.modal_demo = new bootstrap.Modal("#modal");
    setDefaultForm();
  });
  const rules = computed(() => {
    return {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(20)
      }
    };
  });
   const v$ = vuelidate(rules, form);
   const save = async () => {
    let url = null;
    const result = await v$.value.$validate();
    if (result) {
      iAlert().success();
      closeModal(true);
    } else {
      useNuxtApp().$showToast({ msg: "Invalid Input.", type: "error" });
    }
  };
  const showModal = () => {
    state.modal_demo.show();
  };
  
  const closeModal = (isRefresh = false) => {
    emit("closeModal", isRefresh);
    state.modal_demo.hide();
  };
  
  
  defineExpose({
    showModal,
  });
  </script>
  <style lang="scss" scoped>
  p {
    color: #6D7F88;
  }
  .form-log{
    color: var(--color-blue) !important;
  }
  html.dark .form-log{
    color: #fff !important;
  }
  .welcome_to{
    color: var(--color-blue) !important;
  }
  .forgot-password{
    transition: all 0.3s;
  }
  .forgot-password:hover{
    color: #fb5d1f !important;
  }
  html.dark .welcome_to{
    color: #fff !important;
  }
  html.dark .modal-dialog .modal-content {
    background-color: rgb(41, 41, 41);
    .color-mode-btn-close {
      background-color: #fb5d1f;
      opacity: 1;
      color: #ffffff !important;
    }
    label.required {
      color: #ffffff;
    }
    .back{
      background-color: #fb5d1f;
      opacity: 1;
      color: #ffffff !important;
    }
  }
  .text-blue {
    color: #253696 !important;
  }
  </style>
  