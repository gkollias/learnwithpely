<template>
  <!-- intro-section -->

  <section
    id="intro-wrap"
    class="intro-five-Wrap bg-primary text-left text-white"
  >
    <b-container>
      <b-row>
        <div class="col-md-6 intro-five-LeftSection pb-5">
          <h1 class=" font-weight-bold text-white text-42 mb-3 t-shadow">
            Διάβασε και παίξε!
          </h1>
          <p class=" text-20 mb-4">
            Σ´αυτή την online εκπαιδευτική πλατφόρμα μπορείς να κάνεις εξάσκηση
            <a style="text-decoration: underline;">για κάθε κεφάλαιο του σχολικού βιβλίου</a>
            στη γλώσσα και στα μαθηματικά!
          </p>
          <div class=" mb-5 lead">
            <ul class="list-inline">
              <li class=" mb-3 ">
                <i class="eva eva-checkmark-outline mr-2 text-warning" />
                Διάλεξε την τάξη στην οποία βρίσκεσαι
              </li>
              <li class=" mb-3 ">
                <i class="eva eva-checkmark-outline mr-2 text-warning" />
                Επίλεξε το μάθημα που σε ενδιαφέρει
              </li>
              <li class=" mb-3 ">
                <i class="eva eva-checkmark-outline mr-2 text-warning" />
                Κλίκαρε την ενότητα στην οποία θες να εξασκηθείς
              </li>

              <li class="mb-3">
                <i class="eva eva-checkmark-outline mr-2 text-warning" />
                Όσες πιο πολλές σωστές ερωτήσεις απαντήσεις τόσους πιο πολλούς πόντους
                θα συγκεντρώσεις!
              </li>
            </ul>
          </div>
          <!-- <p class=" text-20 mb-4">
            Καλη επιτυχία!!✌️
          </p> -->
        </div>
        <b-col
          md="6"
          class="  intro-five-RightSection d-flex align-items-center"
        >
          <div class="intro-five-ProductImage">
            <img
              src="@/assets/images/school-boy.png"
              class="img-responsive school-boy"
              alt=""
            >
          </div>
        </b-col>
      </b-row>
    </b-container>
    <div class="overlay" />
  </section>
  <!-- end::intro-section -->
</template>

<style>
.school-boy {
  max-width: 200px;
  transform: scaleX(-1);
}
</style>
